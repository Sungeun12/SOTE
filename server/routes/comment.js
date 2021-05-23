const express = require('express');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Like = require('../models/Like');
const router = express.Router();

// 댓글 생성
router.post('/:model/:id/comment', async (req, res) => {
  try {
    const model = req.params.model;
    const docId = req.params.id;
    if(model !== 'vote' && model !== 'notice')
      throw new Error('요청 파라미터가 잘못되었습니다.');
      
    const modelCapitalized = model.charAt(0).toUpperCase() + model.slice(1);
    const comment = new Comment({
      writer: req.body.writer,
      post: docId,
      onModel: `${modelCapitalized}`,
      parentComment: req.body.parentComment,
      text: req.body.text
    });

    await comment.save();
    await User.populate(comment, { path: 'writer' });
    return res.status(201).json({ success: true, data: comment });
  } catch(err) {
    return res.status(400).json({ success: false, err });
  }
})

// 댓글 수정
router.post('/comment/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, 
    { text: req.body.text },
    { new: true })
    .then(comment => res.status(200).json({ success: true, data: comment }))
    .catch(err => res.status(400).json({ success: false, err }));
})

// 댓글 삭제
router.patch('/comment/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id,
    { isDeleted: true })
    .then(comment => res.status(200).json({ success: true, data: comment }))
    .catch(err => res.status(400).json({ success: false, err }));
})

// 댓글 좋아요 전체 조회
router.get('/comment/likes', (req, res) => {
  Like.find({ commentId: req.body.commentId })
    .then(likes => res.status(200).json({ success: true, data: likes }))
    .catch(err => res.status(400).json({ success: false, err }));
})

// 댓글 좋아요
router.post('/comment/like', (req, res) => {
  const like = new Like(req.body);
  like.save()
    .then(like => res.status(201).json({ success: true }))
    .catch(err => res.status(400).json({ success: false, err }));
})

// 댓글 좋아요 취소
router.post('/comment/unlike', (req, res) => {
  Like.findOneAndDelete(req.body)
    .then(like => res.status(200).json({ success: true }))
    .catch(err => res.status(400).json({ success: false, err }));
})

module.exports = router;