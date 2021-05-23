const util = {};

util.makeCommentTrees = (comments) => {
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

module.exports = util;