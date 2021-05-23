const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const likeSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  commentId: {
    type: ObjectId,
    required: true,
    ref: 'Comment'
  }
}, { timestamps: true });

module.exports = mongoose.model('Like', likeSchema);