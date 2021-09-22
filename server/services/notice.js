const Notice = require('../models/Notice');
const Comment = require('../models/Comment');
const { makeCommentTrees } = require('../util');

exports.getNotices = async (groupId, query) => {
  const { page, limit } = query;
  const pageNum = page ? parseInt(page) : 1;
  const limitNum = limit ? parseInt(limit) : 10;
  const skipNum = (pageNum - 1) * limitNum;

  const notices =
    await Notice.find({ group: groupId })
      .sort({ 'createdAt': 'desc' })
      .limit(limitNum)
      .skip(skipNum)
      .populate('writer', 'name image');

  return notices;
}

exports.createNotice = async (groupId, json) => {
  const notice = new Notice({ ...json, group: groupId });
  const newNotice = await notice.save();
  return newNotice;
}

exports.getNotice = async id => {
  const notice = 
    await Notice.findById(noticeId)
      .populate('writer', 'name image');

  const comments = 
    await Comment.find({ post: noticeId })
      .sort('createdAt')
      .populate('writer', 'name image');
  
  if(comments){
    const trees = makeCommentTrees(comments);
    return { notice, comments: trees };
  }
  return { notice };
}

exports.deleteNotice = async id => {
    await Notice.findByIdAndDelete(id);
    await Comment.deleteMany({ post: id });
}

exports.updateNotice = async json => {
  const id = json._id;
  const { title, description, files } = json;

  await Notice.findByIdAndUpdate(id, {
    title,
    description,
    files
  });
}