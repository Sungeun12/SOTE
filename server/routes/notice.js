const express = require('express');
const Comment = require('../models/Comment');
const Notice = require('../models/Notice');
const util = require('./util');
const router = express.Router();

// 단체의 모든 공지사항 조회
router.get('/group/:id/notice', (req, res) => {
  const q = req.query;
  const page = q.page ? parseInt(q.page) : 1;
  const limit = q.limit ? parseInt(q.limit) : 10;
  const skip = (page - 1) * limit;
  const groupId = req.params.id ;

  Notice.find({ group: groupId })
    .sort({ 'createdAt': 'desc' })
    .limit(limit)
    .skip(skip)
    .populate('writer')
    .then(notices => res.status(200).json({ success: true, data: notices }))
    .catch(err => res.status(400).json({ success: false, err }));
})

// 공지사항 생성
router.post('/group/:id/notice', (req, res) => {
  const notice = new Notice({ ...req.body, group: req.params.id });
  notice.save()
    .then(notice => res.status(200).json({ success: true, data: notice._id }))
    .catch(err => res.status(400).json({ success: false, err }));
})

// 개별 공지사항 조회
router.get('/notice/:id', (req, res) => {
  const noticeId = req.params.id;

  Promise.all([
    Notice.findById(noticeId)
      .populate('writer'),

    Comment.find({ post: noticeId })
      .sort('createdAt')
      .populate('writer')
    ])
    .then(([notice, comments]) => {
      const trees = util.makeCommentTrees(comments);
      return res.status(200).json({ success: true, data: { notice, comments: trees }});
    })
    .catch(err => res.status(400).json({ success: false, err }));
})

// 공지사항 삭제
router.delete('/notice/:id', (req, res) => {
  const noticeId = req.params.id;
  Promise.all([
    Notice.findByIdAndDelete(noticeId),
    Comment.deleteMany({ post: noticeId })
  ])
  .then(([notice, comments]) => res.status(200).json({ success: true }))
  .catch(err => res.status(400).json({ success: false, err }));
})

// 공지사항 수정
router.put('/notice', (req, res) => {
  Notice.findByIdAndUpdate(req.body._id, {
    title: req.body.title,
    description: req.body.description,
    files: req.body.files
  },
  { new: true })
    .then(notice => res.status(200).json({ success: true, data: notice }))
    .catch(err => res.status(400).json({ success: false, err }));
});

module.exports = router;