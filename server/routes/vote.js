const express = require('express');
const multer= require('multer');
const path = require('path');
const User = require('../models/User');
const Vote = require('../models/Vote');
const Comment = require('../models/Comment');
const util = require('./util');
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
    .populate('organizer', 'name image')
    .populate('group', 'name image')
    .then(votes => res.status(200).json({ success: true, data: votes }))
    .catch(err => res.status(400).json({ success: false, err }));
});

// 투표 만들기
router.post('/', async (req, res) => {
  try {
    const vote = new Vote(req.body);
    await vote.save();

    const group = await Group.findById(vote.group);
    const message = { groupName: group.name, when: 'voteOpen' };

    for(const member of group.members){
      await User.findByIdAndUpdate(member, { $push: { notificationMessage: message } });
    }
    return res.status(201).json({ success: true, voteId: vote._id });
  } catch(err) {
    return res.status(400).json({ success: false, err });
  }
});

// 주요 투표 보기
router.get('/major', async (req, res) => {
  const MAJOR_LIMIT = 20;
  const currentDate = new Date();
  
  try {
  const official = await Vote.find({ voteType: 'official', endDate: { $gt: currentDate }})
  .sort({voteCount: 'desc'})
  .limit(MAJOR_LIMIT)
  .populate('organizer', 'name image')
  .populate('group', 'name image');

  const free = await Vote.find({ voteType: 'free', endDate: { $gt: currentDate } })
  .sort({voteCount: 'desc'})
  .limit(MAJOR_LIMIT)
  .populate('organizer', 'name image')
  .populate('group', 'name image');

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

// 개별 투표 조회 (완료된 투표의 경우 댓글 포함)
router.get('/:id', async (req, res) => {
  const voteId = req.params.id;
  try {
    const vote = 
      await Vote.findById(voteId)
        .populate('organizer', 'name image')
        .populate('group', 'name image');

    if(vote.endDate > new Date())
      return res.status(200).json({ success: true, data: vote });

    const comments = 
      await Comment.find({ on: voteId })
        .sort('createdAt')
        .populate('writer', 'name image');

    const trees = util.makeCommentTrees(comments);
    return res.status(200).json({ success: true, data: { vote, comments: trees } });
  } catch(err) {
    return res.status(400).json({ success: false, err });
  }
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