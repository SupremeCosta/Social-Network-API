const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) => new Date(createdAt).format('MMM DD, YYYY [at] hh:mm a'),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [
    {
      reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => new Date(createdAt).format('MMM DD, YYYY [at] hh:mm a'),
      },
    },
  ],
});

// Virtual for reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thoughts = mongoose.model('Thoughts', thoughtSchema);

module.exports = Thoughts;