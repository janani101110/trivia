const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    answer: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: false,
    },
    postId: {
      type: String,
      required: false,
    },
    
    createdAt: {
      type: Date,
      default: Date.now,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer',
      default: null
    },
    replies: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer'
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answer", AnswerSchema);
