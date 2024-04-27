// Importing the mongoose library for MongoDB interaction
const mongoose = require("mongoose");

// Defining the schema for resource posts
const ResoPostSchema = new mongoose.Schema(
  {
    // Title of the post, required and unique
    title: {
      type: String,
      required: true,
      unique: true,
    },
    // Description of the post, required and unique
    desc: {
      type: String,
      required: true,
      unique: true,
    },
    // URL of the photo associated with the post, not required
    photo: {
      type: String,
      required: false,
    },
    // Username of the author of the post, not required
    username: {
      type: String,
      required: false,
    },
    // ID of the user who created the post, not required
    userId: {
      type: String,
      required: false,
    },
    // Categories associated with the post, an array of strings, not required
    categories: {
      type: [String],
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

// Creating a Mongoose model named 'ResoPost' using the defined schema
const ResoPost = mongoose.model("ResoPost", ResoPostSchema);

// Exporting the ResoPost model
module.exports = ResoPost;
