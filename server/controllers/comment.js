const CommentService = require('../services/comment');

exports.createComment = (req, res) => {
  const { params } = req;
  const json = req.body;
  CommentService.createComment(params, json)
    .then(comment => res.json({ success: true, data: comment._id }))
    .catch(err => res.json({ success: false, err }));
}

exports.updateComment = (req, res) => {
  const id = req.params.id;
  const { text } = req.body;
  CommentService.updateComment(id, text)
    .then(comment => res.json({ success: true, data: comment }))
    .catch(err => res.json({ success: false, err }));
}

exports.deleteComment = (req, res) => {
  const id = req.params.id;
  CommentService.deleteComment(id)
    .then(() => res.json({ success: true }))
    .catch(err => res.json({ success: false, err }));
}

exports.getLikesNumber = (req, res) => {
  const { commentId } = req.body;
  CommentService.getLikesNumber(commentId)
    .then(likes => res.json({ success: true, data: likes }))
    .catch(err => res.json({ success: false, err }));
}

exports.like = (req, res) => {
  const json = req.body;
  CommentService.like(json)
    .then(() => res.json({ success: true }))
    .catch(err => res.json({ success: false, err }));
}

exports.unlike = (req, res) => {
  const json = req.body;
  CommentService.unlike(json)
    .then(() => res.json({ success: true }))
    .catch(err => res.json({ success: false, err }));
}