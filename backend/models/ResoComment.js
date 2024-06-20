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
    userId: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResoComment", ResoCommentSchema);
