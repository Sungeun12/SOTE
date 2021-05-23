const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const commentSchema = new Schema({
  writer: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: ObjectId,
    required: true,
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    required: true,
    enum: ['Vote', 'Notice']
  },
  parentComment : {
    type: ObjectId,
    ref: 'Comment'
  },
  text: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { 
  toObject: { virtuals: true }, 
  toJSON: { virtuals: true }, 
  timestamps: true 
});

commentSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parentComment'
});

commentSchema
  .virtual('childComments')
  .get(function() {
    return this._childComments;
  })
  .set(function(v) {
    this._childComments = v;
  });

module.exports = mongoose.model('Comment', commentSchema);