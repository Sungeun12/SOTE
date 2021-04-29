const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const groupSchema = new Schema({
  category: {
    type: String,
    enum: ['학부/학과', '동아리', '수업', '기타'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  emailFile: {
    type: String
  },
  joinPolicy: {
    type: String,
    enum: ['accept', 'filter'],
    required: true
  },
  managers: {
    type: [ObjectId],
    ref: 'User',
    required: true
  },
  notices: {
    type: [ObjectId],
    ref: 'Notice'
  }
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);