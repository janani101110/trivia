// Importing the mongoose library for MongoDB interaction
const mongoose = require("mongoose");

// Defining the schema for resource comments
const ResoCommentSchema = new mongoose.Schema(
  {
    // Comment text field, required
    comment: {
      type: String,
      required: true,
    },
    // Author name field, not required
    author: {
      type: String,
      required: false,
    },
    // ID of the post the comment belongs to, required
    postId: {
      type: String,
      required: true,
    },
    // ID of the user who made the comment, not required
    userId: {
      type: String,
      required: false,
    },
    // Creation timestamp, defaults to the current date and time
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
); // Automatically add 'createdAt' and 'updatedAt' timestamps

// Exporting the mongoose model using the defined schema
module.exports = mongoose.model("ResoComment", ResoCommentSchema);
