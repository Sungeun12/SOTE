const express = require('express');
const multer= require('multer');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const stripBom = require('strip-bom-stream');
const { parse } = require('json2csv');
const Group = require('../models/Group');
const Membership = require('../models/Membership');
const router = express.Router();

// MULTER CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/group');
  },
  filename: (req, file, cb) => {
    if(file.mimetype == 'text/csv'){
      cb(null, `email-${Date.now()}${path.extname(file.originalname)}`);
    }
    else if(file.mimetype === 'image/png'|| 
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ){
      cb(null, `img-${Date.now()}${path.extname(file.originalname)}`);
    }
    else {
      cb(new Error('잘못된 MIME 타입입니다.'));
    }
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

  if(q.category){
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
  Group.findOne({ _id: req.params.id })
    // .populate('managers')
    // .populate('notices')
    .then(group => res.status(200).json({ success: true, data: group }))
    .catch(err => res.status(400).json({ success: false, err }));
});

// 파일 업로드
router.post('/:id/upload', upload, async (req, res) => {
  const groupId = req.params.id;
  const filepath = 'group/' + req.file.filename;
  const isEmailFile = req.file.mimetype === 'text/csv';

  if(isEmailFile){
    try {
      deleteAllMemberships(groupId);
      const members = await parseEmailFile(filepath);
      addMemberships(members, groupId);
    } catch(err) {
      return res.status(400).json({ success: false, err: err.message });
    }
  }
  return res.status(201).json({ success: true, filepath });
})

// 이메일 파일 업데이트
router.patch('/:id/emailfile', (req, res) => {
  Group.findByIdAndUpdate(req.params.id, {
    emailFile: req.body.filepath
  })
    .then(group => res.status(200).json({ success: true }))
    .catch(err => res.status(400).json({ success: false, err }));
})

// 개별 멤버 가입
router.post('/:id/join', async (req, res) => {
  const user = req.body;
  const groupId = req.params.id;
  const newMember = {
    이름: user.name,
    이메일: user.email
  };
  
  try {
    await checkIfAlreadyJoined(user.email, groupId);
    const filepath = await findEmailFilepath(groupId);
    const members = await parseEmailFile(filepath);
    addMember(newMember, members);
    updateEmailFile(members, filepath);
    const membership = await addMembership(user.email, groupId);
    return res.status(201).json({ success: true, membershipId: membership._id });
  } catch(err) {
    return res.status(400).json({ success: false, err: err.message });
  }
})

// 멤버 탈퇴
router.post('/:id/leave', async (req, res) => {
  const user = req.body;
  const groupId = req.params.id;

  try {
    deleteMembership(user.email, groupId);
    const filepath = await findEmailFilepath(groupId);
    const members = await parseEmailFile(filepath);
    removeMember(user, members);
    updateEmailFile(members, filepath);
  } catch(err) {
    return res.status(400).json({ success: false, err: err.message });
  }
})

async function checkIfAlreadyJoined(memberEmail, group) {
  const member = await Membership.findOne({ memberEmail, group });
  if(member) throw new Error('이미 가입된 멤버입니다.');
}

async function addMembership(memberEmail, group) {
  const membership = new Membership({ memberEmail, group, status: 'joined' });
  return membership.save();
}

async function addMemberships(members, group) {
  members.forEach(async member => {
    const membership = new Membership({
      memberEmail: member['이메일'],
      group,
      status: 'joined'
    });
    membership.save();
  });
}

async function deleteMembership(memberEmail, group) {
  const membership = await Membership.findOneAndDelete({ memberEmail, group });
  if(!membership) throw new Error('존재하지 않는 멤버입니다.');
}

async function deleteAllMemberships(group) {
  await Membership.deleteMany({ group });
}

async function findEmailFilepath(groupId) {
  const group = await Group.findOne({ _id: groupId });
  if(!group) throw new Error('단체를 찾을 수 없습니다.');
  return group.emailFile;
}

async function parseEmailFile(filepath) {
  const members = [];
  return new Promise((resolve, reject) => {
    const stream = 
    fs.createReadStream('./uploads/' + filepath)
      .pipe(stripBom())
      .pipe(csv());

    stream.on('data', row => {
      if(row['이름'] && row['이메일']) members.push(row);
    });
    stream.on('end', () => resolve(members));
    stream.on('error', err => reject(err));
  })
}

async function updateEmailFile(members, filepath) {
  const json2csv = parse(members, { withBOM: true });        
  fs.writeFile('./uploads/' + filepath, json2csv, (err) => {
    if(err) throw new Error('CSV 파일 쓰기에 실패하였습니다.');
  })
}

function addMember(user, members) {
  members.push(user);
}

function removeMember(user, members) {
  const userIndex = members.findIndex(member => {
    return member.이름 === user.name && member.이메일 === user.email
  });
  if(userIndex === -1){
    throw new Error('해당 멤버를 CSV 파일에서 찾을 수 없습니다.');
  }
  members.splice(userIndex, 1);
}

// 매니저 관리
router.post('/:id/manage', (req, res) => {
  // send invitation email
  // if answer -> managers.push
})

// 공지사항
router.post('/:id/notice', (req, res) => {
  // isAdmin ? CRUD : R 
  // notices.push
})

module.exports = router;