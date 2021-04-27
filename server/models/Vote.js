const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const voteSchema = new Schema({
  contractAddr: {
    type: String,
    required: true
  },
  organizer: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  group: {
    type: ObjectId,
    ref: 'Group'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  voteType: {
    type: String,
    enum: ['official', 'free', 'group'],
    required: true
  },
  selectionType: {
    type: String,
    enum: ['single', 'multi'],
    required: true
  },
  category: {
    type: String
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  voteCount: {
    type: Number,
    default: 0
  },
  options: {
    type: [{ name: String, description: String, image: String }],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Vote', voteSchema);