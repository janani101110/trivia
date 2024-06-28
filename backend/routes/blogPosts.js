const express = require('express');
const router = express.Router();
const Post = require('../models/blogPost.js');

router.get('/popularBlogs', async (req, res) => {
  try {
    const topPosts = await Post.find().sort({ likes: -1 }).limit(3);
    res.status(200).json(topPosts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching top posts", error: err });
  }
});

// Create
router.post("/create", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id });
    if (post) {
      await Bookmark.deleteMany({ blogPost: req.params.id }); // Make sure Bookmark is defined or imported
      res.status(200).json("Post and associated bookmarks have been deleted");
    } else {
      res.status(404).json("Post not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Post Details
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Posts of a user
router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.params.userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});



// Route to handle post like
router.post("/:postId/like", async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    const userId = req.body.userId;

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: "You have already liked this post" });
    }

    post.likes.push(userId);
    await post.save();
    res.status(200).json({ message: "Post liked successfully" });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to handle post unlike
router.delete("/:postId/like/:userId", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.params.userId;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.likes.includes(userId)) {
      return res.status(400).json({ message: "You have not liked this post" });
    }

    post.likes.pull(userId);
    await post.save();

    res.status(200).json({ message: "Post unliked successfully" });
  } catch (error) {
    console.error("Error unliking post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get all posts, optionally filtered by a search query
router.get("/", async (req, res) => {
  const query = req.query.search;
  console.log("Received query:", query); // Debug: Log the received query
  try {
    const searchFilter = query ? { title: { $regex: query, $options: "i" } } : {};
    const posts = await Post.find(searchFilter);
    console.log("Filtered posts:", posts); // Debug: Log the filtered posts
    res.status(200).json(posts);
  } catch (err) {
    console.log("Error retrieving posts:", err); // Debug: Log any errors
    res.status(500).json(err);
  }
});
module.exports = router;
