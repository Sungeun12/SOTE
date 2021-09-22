const User = require('../models/User');
const Comment = require('../models/Comment');
const Like = require('../models/Like');

exports.createComment = async (params, json) => {
  const { model, id } = params;
  const { writer, parentComment, text } = json;

  if(model !== 'vote' && model !== 'notice'){
    throw new Error('요청 파라미터가 잘못되었습니다.');
  }
  const modelCapitalized = model.charAt(0).toUpperCase() + model.slice(1);
  const comment = new Comment({
      writer,
      post: id,
      onModel: `${modelCapitalized}`,
      parentComment,
      text
  });
  const newComment = await comment.save();
  await User.populate(comment, { path: 'writer', select: 'name image' });
  return newComment;
}

exports.updateComment = async (id, text) => {
  const comment = await Comment.findByIdAndUpdate(id, { text });
  return comment;
}

exports.deleteComment = async id => {
  await Comment.findByIdAndUpdate(id, { isDeleted: true });
}

exports.getLikesNumber = async id => {
  const likes = await Like.find({ commentId: id });
  return likes;
}

exports.like = async json => {
  const like = new Like(json);
  await like.save();
}

exports.unlike = async json => {
  await Like.findOneAndDelete(json);
}