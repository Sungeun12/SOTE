const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

exports.upload = multer({ storage });

exports.makeCommentTrees = comments => {
  const cloned = comments.slice();
  for(let i = cloned.length - 1; i >= 0; i--) {
    const parentId = cloned[i]['parentComment'];
    if(!parentId) continue;
    const parent = comments.find(comment => parentId === comment['_id']);
    if(parent) {
      parent['childComments'] ?
      parent['childComments'].push(cloned[i]) :
      parent['childComments'] = [cloned[i]];
    }
    cloned.splice(i, 1);
  }
  return cloned;
}