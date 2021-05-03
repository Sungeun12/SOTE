const express = require('express');
const multer= require('multer');
const path = require('path');
const Group = require('../models/Group');
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
      cb(new Error('wrong mime type'));
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

// 파일 업로드
router.post('/upload', async (req, res) => {
  upload(req, res, err => {
    if(err) {
      return res.status(400).json({ success: false, err: err.message });
    }
    return res.status(201).json({ success: true, filepath: req.file.path });
  })
})

// 개별 단체 조회
router.get('/:id', (req, res) => {
  Group.findOne({ _id: req.params.id })
    // .populate('managers')
    // .populate('notices')
    .then(group => res.status(200).json({ success: true, data: group }))
    .catch(err => res.status(400).json({ success: false, err }));
});

module.exports = router;