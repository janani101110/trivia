const express = require("express");
const router = express.Router();
const answer = require("../models/answer");
const User = require('../models/User.js');
const verifyToken = require('../middleware/verifyToken.js');

// Route for creating a new comment
router.post("/create", async (req, res) => {
  try {
    const newComment = new answer(req.body);
    const savedComment = await newComment.save();

    // If the comment is a reply, update the parent comment's replies
    if (req.body.parentId) {
      await answer.findByIdAndUpdate(req.body.parentId, {
        $push: { replies: savedComment._id }
      });
    }

    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route for deleting a comment by its ID
router.delete("/:id", async (req, res) => {
  try {
    await answer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Comment has been deleted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route for retrieving comments by post ID
router.get("/post/:postId", async (req, res) => {
  try {
    const answers = await answer.find({ postId: req.params.postId, parentId: null })
      .populate({
        path: 'replies',
        populate: { path: 'replies' } // Populate nested replies
      });
    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
