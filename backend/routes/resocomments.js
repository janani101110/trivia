const express = require("express");
const router = express.Router();
const ResoComment = require("../models/ResoComment");
const User = require('../models/User.js');
const verifyToken = require('../middleware/verifyToken.js');

// Route for creating a new comment
router.post("/create", async (req, res) => {
  try {
    const newComment = new ResoComment(req.body);
    const savedComment = await newComment.save();
    res.status(201).json(savedComment); // Change status to 201 for resource created
  } catch (err) {
    res.status(500).json({ error: err.message }); // Better error handling
  }
});

// Route for deleting a comment by its ID
router.delete("/:id", async (req, res) => {
  try {
    await ResoComment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Comment has been deleted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route for retrieving comments by post ID
router.get("/post/:postId", async (req, res) => {
  try {
    const ResoComments = await ResoComment.find({ postId: req.params.postId });
    res.status(200).json(ResoComments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
