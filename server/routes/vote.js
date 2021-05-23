const express = require('express');
const multer= require('multer');
const path = require('path');
const User = require('../models/User');
const Vote = require('../models/Vote');
const router = express.Router();

// MULTER CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/option');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage }).single('img');

// 전체 투표 조건별 조회
router.get('/', (req, res) => {
  const q = req.query;
  const page = q.page ? parseInt(q.page) : 1;
  const limit = q.limit ? parseInt(q.limit) : 10;
  const skip = (page - 1) * limit;
  const currentDate = new Date();
  const match = {};
  const inOrder = {};
  
  if(q.gid) {
    match.group = q.gid;
  }
  if(q.type){
    match.voteType = q.type;
  }
  if(q.category){
    match.category = q.category;
  }
  if(q.closed === 'true'){
    match.endDate = { $lt: currentDate };
  }
  if(q.closed === 'false'){
    match.endDate = { $gt: currentDate };
  }
  if(!q.order){
    inOrder.endDate = q.closed ? 'desc': 'asc';
  }
  else if(q.order === 'popular'){
    inOrder.voteCount = 'desc';
  } 
  else if(q.order === 'recent'){
    inOrder.createdAt = 'desc';
  }

  Vote.find(match)
    .sort(inOrder)
    .limit(limit)
    .skip(skip)
    .populate('organizer')
    .populate('group')
    .then(votes => res.status(200).json({ success: true, data: votes }))
    .catch(err => res.status(400).json({ success: false, err }));
});

// 투표 만들기
router.post('/', (req, res) => {
  const vote = new Vote(req.body);
  vote.save()
    .then(vote => res.status(201).json({ success: true, voteId: vote._id }))
    .catch(err => res.status(400).json({ success: false, err }));
});

// 주요 투표 보기
router.get('/major', async (req, res) => {
  const MAJOR_LIMIT = 20;
  const currentDate = new Date();
  
  try {
  const official = await Vote.find({ voteType: 'official', endDate: { $gt: currentDate }})
  .sort({voteCount: 'desc'})
  .limit(MAJOR_LIMIT)
  .populate('organizer')
  .populate('group');

  const free = await Vote.find({ voteType: 'free', endDate: { $gt: currentDate } })
  .sort({voteCount: 'desc'})
  .limit(MAJOR_LIMIT)
  .populate('organizer')
  .populate('group');

  return res.status(200).json({ success: true, data: { official, free } });
  } 
  catch(err) {
    return res.status(400).json({ success: false, err });
  }
})

// 후보 이미지 업로드
router.post('/upload', async (req, res) => {
  upload(req, res, err => {
    if(err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(201).json({ success: true, filepath: '/option/' + req.file.filename });
  })
})

// 개별 투표 조회
router.get('/:id', (req, res) => {
  Vote.findOne({ _id: req.params.id })
    .populate('organizer')
    .populate('group')
    .then(vote => res.status(200).json({ success: true, data: vote }))
    .catch(err => res.status(400).json({ success: false, err }));
});

// 투표하기 (투표자수 및 사용자의 투표 배열 수정)
router.post('/:id', async (req, res) => {
    const voteId = req.params.id;
    const userId = req.body.userId;

    try {
      await Vote.findByIdAndUpdate(voteId, { $inc: { voteCount: 1 } });
      await User.findByIdAndUpdate(userId, { $push: { votes: voteId }});
      return res.status(200).json({ success: true });
    } catch(err) {
      return res.status(400).json({ success: false, err });
    }
})

module.exports = router;