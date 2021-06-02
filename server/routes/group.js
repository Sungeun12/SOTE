const express = require('express');
const multer= require('multer');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const stripBom = require('strip-bom-stream');
const { parse } = require('json2csv');
const User = require('../models/User');
const Group = require('../models/Group');
const Vote = require('../models/Vote');
const Notice = require('../models/Notice');
const router = express.Router();

// MULTER CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/group');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage }).single('group');

// 전체 단체 조건별 조회
router.get('/', (req, res) => {
  const q = req.query;
  const page = q.page ? parseInt(q.page) : 1;
  const limit = q.limit ? parseInt(q.limit) : 10;
  const skip = (page - 1) * limit;
  const match = {};
  const inOrder = {};

  if(q.category && q.category !== 'all'){
    match.category = q.category;
  }
  if(q.order === 'popular'){
    inOrder.memberCount = 'desc';
  } 
  if(q.order === 'recent'){
    inOrder.createdAt = 'desc';
  }

  Group.find(match)
    .sort(inOrder)
    .limit(limit)
    .skip(skip)
    .then(groups => res.status(200).json({ success: true, data: groups }))
    .catch(err => res.status(400).json({ success: false, err }));
});

// 단체 만들기
router.post('/', (req, res) => {
  const group = new Group({
    managers: [req.body.manager],
    category: req.body.category,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    emailFile: req.body.emailFile,
    joinPolicy: req.body.joinPolicy
  });
  group.save()
    .then(group => res.status(201).json({ success: true, groupId: group._id }))
    .catch(err => res.status(400).json({ success: false, err }));
});

// 단체 업데이트
router.put('/', (req, res) => {
  Group.findByIdAndUpdate(req.body._id, {
    category: req.body.category,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    joinPolicy: req.body.joinPolicy
  })
    .then(group => res.status(200).json({ success: true }))
    .catch(err => res.status(400).json({ success: false, err }));
});

// 개별 단체 조회
router.get('/:id', (req, res) => {
  const LIMIT = 10;
  const groupId = req.params.id;

  Promise.all([
    Group.findById(groupId)
      .populate('managers', 'name image email')
      .populate('members', 'name image email')
      .populate('waitinglist', 'name image email'),

    Notice.find({ group: groupId })
      .sort({'createdAt': 'desc' })
      .limit(LIMIT)
      .populate('writer', 'name image'),

    Vote.find({ group: groupId })
      .sort({'createdAt': 'desc' })
      .limit(LIMIT)
      .populate('organizer', 'name image')
    ])
    .then(([group, notices, votes]) => {
      return res.status(200).json({ success: true, data: { group, notices, votes } });
    })
    .catch(err => res.status(400).json({ success: false, err }));
});

// 이메일 파일 경로 업데이트
router.patch('/:id', (req, res) => {
  Group.findByIdAndUpdate(req.params.id, {
    emailFile: req.body.filepath
  })
    .then(group => res.status(200).json({ success: true }))
    .catch(err => res.status(400).json({ success: false, err }));
})

// 이메일 파일 업로드
router.post('/:id/emailupload', upload, async (req, res) => {
  const members = [];
  const unregistered = [];
  const groupId = req.params.id;
  const filepath = 'group/' + req.file.filename;

  if(req.file.mimetype !== 'text/csv')
    return res.status(400).json({ success: false, err: "잘못된 MIME 타입입니다." });

  try {
    const rows = await parseEmailFile(filepath);
    const emails = rows.map(row => row['이메일']);
    for(const email of emails) {
      const userId = await findUserIdByEmail(email);
      if(!userId) unregistered.push(email);
      else members.push(userId);
    }
    await setMembers(groupId, members);
    await addToUnregistered(groupId, unregistered);
    return res.status(201).json({ success: true, filepath });
  } catch(err) {
    return res.status(400).json({ success: false, err: err.message });
  }
})

// 멤버 가입 요청
router.post('/:id/joinreq', async (req, res) => {
  const userId = req.body.userId;
  const groupId = req.params.id;
  const user = await findUserById(userId);
  const group = await Group.findById(groupId);
  try {
    if(group.unregistered.includes(user.email)) {
      addMember(groupId, userId);
      removeFromUnregistered(groupId, user.email);
      return res.status(201).json({ success: true, result: 'joined' });
    }
    else if(group.joinPolicy === 'accept'){
        const filepath = group.emailFile;
        const rows = await parseEmailFile(filepath);
        const row = {
          이름: user.name,
          이메일: user.email
        };
        rows.push(row);
        overwriteEmailFile(filepath, rows);
        addMember(groupId, userId);
        return res.status(201).json({ success: true, result: 'joined' });
    }
    else if(group.joinPolicy === 'filter') {
      await addToWaitinglist(groupId, userId);

      // * 매니저에게 알림 발송 추가할 것 *
  
      return res.status(201).json({ success: true, result: 'wait' });
    }
    else {
      throw new Error('단체의 가입 방식이 존재하지 않습니다.');
    }
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
})

// 멤버 등록
router.post('/:id/join', async (req, res) => {
  const user = req.body;
  const groupId = req.params.id;
  
  try {
    const userId = await findUserIdByEmail(user.email);
    const filepath = await findEmailFilepath(groupId);
    const rows = await parseEmailFile(filepath);
    const row = {
      이름: user.name,
      이메일: user.email
    };
    rows.push(row);
    overwriteEmailFile(filepath, rows);
    addMember(groupId, userId);
    return res.status(201).json({ success: true });
  } catch(err) {
    return res.status(400).json({ success: false, err });
  }
})

// 멤버 탈퇴
router.post('/:id/leave', async (req, res) => {
  const userId = req.body.userId;
  const groupId = req.params.id;

  try {
    const user = await findUserById(userId);
    const filepath = await findEmailFilepath(groupId);
    const rows = await parseEmailFile(filepath);
    removeUserFromRows(user, rows);
    overwriteEmailFile(filepath, rows);
    removeMember(groupId, userId);
    return res.status(200).json({ success: true });
  } catch(err) {
    return res.status(400).json({ success: false, err: err.message });
  }
})

// 기타 파일 업로드
router.post('/upload', async (req, res) => {
  upload(req, res, err => {
    if(err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(201).json({ success: true, filepath: '/group/' + req.file.filename });
  })
})

// 매니저 등록
router.post('/:id/manager', async (req, res) => {
  const groupId = req.params.id;
  const email = req.body.email;

  try {
    const managerId = await findUserIdByEmail(email);
    if(!managerId) 
      return res.status(400).json({ success: false, err: '존재하지 않는 사용자입니다.' });
    await Group.findByIdAndUpdate(groupId, { 
      $push: { managers: managerId } 
    });
    return res.status(200).json({ success: true });
} catch(err) {
  return res.status(400).json({ success: false, err });
}
})

// 매니저 삭제
router.delete('/:id/manager', (req, res) => {
  Group.findByIdAndUpdate(req.params.id, { 
    $pull: { managers: req.body.managerId } 
  })
    .then(group => res.status(200).json({ success: true }))
    .catch(err => res.status(400).json({ success: false, err }));
})

const findUserIdByEmail = async email => {
  const user = await User.findOne({ email });
  return user ? user._id : null;
}

const addToUnregistered = async (groupId, unregistered) => {
  await Group.findByIdAndUpdate(groupId, {
    $push: { unregistered: { $each: unregistered } } 
  });
}

const removeFromUnregistered = async (groupId, email) => {
  await Group.findByIdAndUpdate(groupId, {
    $pull: { unregistered: email } 
  });
}

const setMembers = async (groupId, members) => {
  await Group.findByIdAndUpdate(groupId, { $set: { members }});
}

const addToWaitinglist = async (groupId, userId) => {
  await Group.findByIdAndUpdate(groupId, {
    $push: { waitinglist: userId }
  });
}

const findUserById = async userId => {
  const user = await User.findById(userId);
  return user;
}

const addMember = async (groupId, userId) => {
  await Group.findByIdAndUpdate(groupId, {
    $push: { members: userId }
  });
}

const removeMember = async (groupId, userId) => {
  await Group.findByIdAndUpdate(groupId, {
    $pull: { members: userId }
  });
}

const findEmailFilepath = async groupId => {
  const group = await Group.findById(groupId);
  return group.emailFile;
}

const parseEmailFile = async filepath => {
  const rows = [];
  return new Promise((resolve, reject) => {
    const stream = 
    fs.createReadStream('./uploads/' + filepath)
      .pipe(stripBom())
      .pipe(csv());

    stream.on('data', row => {
      if(row['이름'] && row['이메일']) rows.push(row);
    });
    stream.on('end', () => resolve(rows));
    stream.on('error', err => reject(err));
  })
}

const overwriteEmailFile = async (filepath, rows) => {
  const json2csv = parse(rows, { withBOM: true });        
  fs.writeFile('./uploads/' + filepath, json2csv, (err) => {
    if(err) throw new Error('CSV 파일 쓰기에 실패하였습니다.');
  })
}

const removeUserFromRows = async (user, rows) => {
  const userIndex = rows.findIndex(row => {
    return row.이름 === user.name && row.이메일 === user.email
  });
  if(userIndex === -1){
    throw new Error('해당 멤버를 CSV 파일에서 찾을 수 없습니다.');
  }
  members.splice(userIndex, 1);
}

module.exports = router;