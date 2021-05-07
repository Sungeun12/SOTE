const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const membershipSchema = new Schema({
  memberEmail: {
    type: String,
    required: true
  },
  group: {
    type: ObjectId,
    ref: 'Group',
    required: true
  },
  status: {
    type: String,
    enum: ['joined', 'waiting', 'declined'],
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Membership', membershipSchema);