const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const noticeSchema = new Schema({
  writer: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  group: {
    type: ObjectId,
    ref: 'Group',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  files: {
    type: [String]
  }
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);