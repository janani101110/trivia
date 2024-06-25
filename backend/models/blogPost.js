const { ObjectId } = require('mongodb');
const Bookmark = require('./Bookmark.js');
const mongoose = require('mongoose');

// Function to validate YouTube URLs
const isValidYoutubeUrl = (url) => {
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return regex.test(url);
};

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false,
  },
  videoURL: {
    type: String,
    required: false,
    validate: {
      validator: isValidYoutubeUrl,
      message: (props) => `${props.value} is not a valid YouTube URL!`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  postedBy: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
    required: false, // Ensure the email is required if needed
  }
});

blogPostSchema.pre('findOneAndDelete', async function (next) {
  try {
    const doc = await this.model.findOne(this.getFilter());
    if (doc) {
      await Bookmark.deleteMany({ blogPost: doc._id });
    }
    next();
  } catch (error) {
    console.error('Error deleting bookmarks:', error);
    next(error);
  }
});

const blogPost = mongoose.model('blogPost', blogPostSchema);

module.exports = blogPost;
