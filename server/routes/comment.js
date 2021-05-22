const express = require('express');
const User = require('../models/User');
const Comment = require('../models/Comment');
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
    .then(comment => res.status(201).json({ success: true, data: comment }))
    .catch(err => res.status(400).json({ success: false, err }));
})

// 댓글 삭제
router.patch('/comment/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id,
    { isDeleted: true })
    .then(comment => res.status(201).json({ success: true, data: comment }))
    .catch(err => res.status(400).json({ success: false, err }));
})

module.exports = router;