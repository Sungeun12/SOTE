const Vote = require('../models/Vote');
const Comment = require('../models/Comment');
const User = require('../models/User');
const { makeCommentTrees } = require('../util');

exports.getVotes = async query => {
  const { page, limit, gid, type, category, closed, order } = query;
  const pageNum = page ? parseInt(page) : 1;
  const limitNum = limit ? parseInt(limit) : 10;
  const skipNum = (pageNum - 1) * limitNum;
  const currentDate = new Date();
  const match = {};
  const inOrder = {};
  
  if(gid) {
    match.group = gid;
  }
  if(type){
    match.voteType = type;
  }
  if(category){
    match.category = category;
  }
  if(closed === 'true'){
    match.endDate = { $lt: currentDate };
  }
  if(closed === 'false'){
    match.endDate = { $gt: currentDate };
  }
  if(order === 'popular'){
    inOrder.voteCount = 'desc';
  } else if(order === 'recent'){
    inOrder.createdAt = 'desc';
  } else {
      inOrder.endDate = closed ? 'desc': 'asc';
  }

  const votes = 
    await Vote.find(match)
      .sort(inOrder)
      .limit(limitNum)
      .skip(skipNum)
      .populate('organizer', 'name image')
      .populate('group', 'name image');

  return votes;
}

exports.createVote = async json => {
  const vote = new Vote(json);
  const newVote = await vote.save();
  return newVote;
}
  
exports.getMajorVotes = async () => {
  const MAJOR_LIMIT = 20;
  const currentDate = new Date();
  const votes = {};

  votes.official = await Vote.find({ voteType: 'official', endDate: { $gt: currentDate }})
  .sort({voteCount: 'desc'})
  .limit(MAJOR_LIMIT)
  .populate('organizer', 'name image')
  .populate('group', 'name image');

  votes.free = await Vote.find({ voteType: 'free', endDate: { $gt: currentDate } })
  .sort({voteCount: 'desc'})
  .limit(MAJOR_LIMIT)
  .populate('organizer', 'name image')
  .populate('group', 'name image');
  
  return votes;
}

exports.getVote = async id => {
  const vote = 
    await Vote.findById(id)
      .populate('organizer', 'name image')
      .populate('group', 'name image');

  if(vote.endDate > new Date())
    return { vote };

  const comments = 
    await Comment.find({ post: id })
      .sort('createdAt')
      .populate('writer', 'name image');

  const trees = makeCommentTrees(comments);
  return { vote, comments: trees };
}

exports.castVote = async (voteId, userId) => {
  await Vote.findByIdAndUpdate(voteId, { $inc: { voteCount: 1 } });
  await User.findByIdAndUpdate(userId, { $push: { votes: voteId }});
}