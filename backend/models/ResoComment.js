const mongoose = require("mongoose");

const ResoCommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: false,
    },
    postId: {
      type: String,
      required: true,
    },
    
    createdAt: {
      type: Date,
      default: Date.now,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ResoComment',
      default: null
    },
    replies: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ResoComment'
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResoComment", ResoCommentSchema);
