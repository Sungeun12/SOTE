const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const groupSchema = new Schema({
  category: {
    type: String,
    enum: ['club', 'major', 'class', 'etc'],
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
  members: {
    type: [ObjectId],
    ref: 'User'
  },
  waitinglist: {
    type: [ObjectId],
    ref: 'User'
  },
  unregistered: {
    type: [String]
  }
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);