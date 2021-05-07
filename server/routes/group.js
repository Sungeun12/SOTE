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
router.post('/:id/upload', upload, (req, res) => {
  const groupId = req.params.id;
  const filepath = '/group/' + req.file.filename;
  const isEmailFile = req.file.mimetype === 'text/csv';

  if(isEmailFile){
    const members = [];

    // CSV 파일 파싱
    fs.createReadStream('./uploads' + filepath)
      .pipe(stripBom())
      .pipe(csv())
      .on('data', row => {
        if(row['이름'] && row['이메일'])
          members.push(row);
      })
      .on('end', () => {
        console.log(members);
        console.log('CSV file successfully processed');
        
        // 기존에 등록되어 있던 멤버십 일괄 삭제
        Membership.deleteMany({ group: groupId });
        
        // 모든 회원 멤버십 등록
        members.forEach(member => {
          const membership = new Membership({
            memberEmail: member['이메일'],
            group: groupId,
            status: 'joined'
          });
          membership.save();
        })
      });
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
    // 이미 가입된 멤버인지 확인
    const member = await Membership.findOne({ 
      memberEmail: user.email, 
      group: groupId 
    });
    if(member) return res.status(400).json({ success: false, err: '이미 가입된 멤버입니다.' });

    // 그룹 이메일 파일 찾기
    const group = await Group.findOne({ _id: groupId })
    if(!group) return res.status(400).json({ success: false, err: '단체를 찾을 수 없습니다.' });
    const filepath = './uploads' + group.emailFile;

    // csv 파일에 새 멤버 추가
    const members = await parseCSVFile(filepath);
    members.push(newMember);

    const json2csv = parse(members, { withBOM: true });        
    fs.writeFile(filepath, json2csv, (err) => {
      if(err) return res.status(400).json({ success: false, err: 'CSV 파일 쓰기에 실패하였습니다.' }); 
    })
    
    // 멤버십 등록
    const membership = new Membership({
      memberEmail: user.email,
      group: groupId,
      status: 'joined'
    });
    await membership.save();
    return res.status(201).json({ success: true, membershipId: membership._id });
  } catch(err) {
    return res.status(400).json({ success: false, err });
  }

  async function parseCSVFile(filepath) {
    const members = [];
    return new Promise((resolve, reject) => {
      const stream = 
      fs.createReadStream(filepath)
        .pipe(stripBom())
        .pipe(csv());
  
      stream.on('data', row => members.push(row));
      stream.on('end', () => resolve(members));
      stream.on('error', err => reject(err));
    })
  }
})

module.exports = router;