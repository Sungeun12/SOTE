const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comment');

router.post('/:model/:id/comment', CommentController.createComment);

router.post('/comment/:id', CommentController.updateComment);

router.patch('/comment/:id', CommentController.deleteComment);

router.get('/comment/likes', CommentController.getLikesNumber);

router.get('/comment/like', CommentController.like);

router.get('/comment/unlike', CommentController.unlike);

module.exports = router;