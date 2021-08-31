const fs = require('fs');
const csv = require('csv-parser');
const stripBom = require('strip-bom-stream');
const { parse } = require('json2csv');
const User = require('../models/User');
const Group = require('../models/Group');
const Vote = require('../models/Vote');
const Notice = require('../models/Notice');

exports.getGroups = async query => {
  const { page, limit, category, order } = query;
  const pageNum = page ? parseInt(page) : 1;
  const limitNum = limit ? parseInt(limit) : 10;
  const skipNum = (pageNum - 1) * limitNum;
  const match = {};
  const inOrder = {};

  if(category && category !== 'all'){
    match.category = q.category;
  }
  if(order === 'popular'){
    inOrder.memberCount = 'desc';
  } 
  if(order === 'recent'){
    inOrder.createdAt = 'desc';
  }

  const groups =
    await Group.find(match)
    .sort(inOrder)
    .limit(limitNum)
    .skip(skipNum);

  return groups;
}

exports.createGroup = async json => {
  const { manager, category, name, description, image, emailFile, joinPolicy } = json;
  const group = new Group({
    managers: [manager],
    category,
    name,
    description,
    image,
    emailFile,
    joinPolicy
  });

  const newGroup = await group.save();
  if(newGroup.emailFile){
    handleEmailFile(newGroup._id, newGroup.emailFile);
  } 
  return newGroup;
}

exports.updateGroup = async json => {
  const id = json._id;
  const { category, name, description, image, joinPolicy } = json;

  await Group.findByIdAndUpdate(id, {
    category,
    name,
    description,
    image,
    joinPolicy
  });
}

exports.getGroup = async id => {
  const LIMIT = 10;
  
  const group = 
    await Group.findById(id)
      .populate('managers', 'name image')
      .populate('members', 'name image')
      .populate('waitinglist', 'name image');

  const notices = 
    await Notice.find({ group: id })
      .sort({'createdAt': 'desc' })
      .limit(LIMIT)
      .populate('writer', 'name image');

  const votes = 
    await Vote.find({ group: id })
      .sort({'createdAt': 'desc' })
      .limit(LIMIT)
      .populate('organizer', 'name image');
  
  return { group, notices, votes };
}

exports.updateEmailFilepath = async (groupId, filepath) => {
  await Group.findByIdAndUpdate(groupId, { emailFile: filepath });
  handleEmailFile(groupId, filepath);
}

exports.requestForJoin = async (groupId, userId) => {
  const group = await Group.findById(groupId);
  const user = await User.findById(userId);
  let result = 'joined';
  
  if(group.unregistered.includes(user.email)) {
    addMember(groupId, userId);
    removeFromUnregistered(groupId, user.email);
  }
  else if(group.joinPolicy === 'accept'){
    const filepath = group.emailFile;
    appendToEmailFile(filepath);
    addMember(groupId, userId);
  }
  else if(group.joinPolicy === 'filter') {
    await addToWaitinglist(groupId, userId);
    result = 'wait';
  }
  else {
    throw new Error('단체의 가입 방식이 존재하지 않습니다.');
  }
  return result;
}

exports.registerMember = async (groupId, user) => {
  const userId = await findUserIdByEmail(user.email);
  const filepath = await findEmailFilepath(groupId);
  appendToEmailFile(filepath);
  addMember(groupId, userId);
}


exports.unregisterMember = async (groupId, userId) => {
  const user = await User.findById(userId);
  const filepath = await findEmailFilepath(groupId);
  if(filepath){
    const rows = await parseEmailFile(filepath);
    removeUserFromRows(user, rows);
    overwriteEmailFile(filepath, rows);
  }
  removeMember(groupId, userId);
}

exports.registerManager = async (groupId, email) => {
  const managerId = await findUserIdByEmail(email);
  if(!managerId) 
    throw new Error('존재하지 않는 사용자입니다.');
  await Group.findByIdAndUpdate(groupId, { 
    $push: { managers: managerId } 
  });
}

exports.unregisterManager = async (groupId, managerId) => {
  await Group.findByIdAndUpdate(groupId, { 
    $pull: { managers: managerId } 
  });
}

const handleEmailFile = async (groupId, filepath) => {
  const members = [];
  const unregistered = [];
  const rows = await parseEmailFile(filepath);
  const emails = rows.map(row => row['이메일']);
  for(const email of emails) {
    const userId = await findUserIdByEmail(email);
    if(!userId) unregistered.push(email);
    else members.push(userId);
  }
  await setMembers(groupId, members);
  await setUnregistered(groupId, unregistered);
}

const findUserIdByEmail = async email => {
  const user = await User.findOne({ email });
  return user ? user._id : null;
}

const setUnregistered = async (groupId, unregistered) => {
  await Group.findByIdAndUpdate(groupId, { $set: { unregistered }});
}

const removeFromUnregistered = async (groupId, email) => {
  await Group.findByIdAndUpdate(groupId, {
    $pull: { unregistered: email } 
  });
}

const setMembers = async (groupId, members) => {
  await Group.findByIdAndUpdate(groupId, { $set: { members }});
}

const addToWaitinglist = async (groupId, userId) => {
  await Group.findByIdAndUpdate(groupId, {
    $push: { waitinglist: userId }
  });
}

const addMember = async (groupId, userId) => {
  await Group.findByIdAndUpdate(groupId, {
    $push: { members: userId }
  });
}

const removeMember = async (groupId, userId) => {
  await Group.findByIdAndUpdate(groupId, {
    $pull: { members: userId }
  });
}

const findEmailFilepath = async groupId => {
  const group = await Group.findById(groupId);
  return group.emailFile;
}

const parseEmailFile = async filepath => {
  const rows = [];
  return new Promise((resolve, reject) => {
    const stream = 
    fs.createReadStream('./uploads/' + filepath)
      .pipe(stripBom())
      .pipe(csv());

    stream.on('data', row => {
      if(row['이름'] && row['이메일']) rows.push(row);
    });
    stream.on('end', () => resolve(rows));
    stream.on('error', err => reject(err));
  })
}

const overwriteEmailFile = async (filepath, rows) => {
  const json2csv = parse(rows, { withBOM: true });        
  fs.writeFile('./uploads/' + filepath, json2csv, (err) => {
    if(err) throw new Error('CSV 파일 쓰기에 실패하였습니다.');
  })
}

const removeUserFromRows = async (user, rows) => {
  const userIndex = rows.findIndex(row => {
    return row.이름 === user.name && row.이메일 === user.email
  });
  if(userIndex === -1){
    throw new Error('해당 멤버를 CSV 파일에서 찾을 수 없습니다.');
  }
  members.splice(userIndex, 1);
}

const appendToEmailFile = async filepath => {
  if(filepath){
    const rows = await parseEmailFile(filepath);
    const row = {
      이름: user.name,
      이메일: user.email
    };
    rows.push(row);
    overwriteEmailFile(filepath, rows);
  }
}