const express = require("express");
const router = express.Router();
const Answer = require("../models/answer.js");
const User = require('../models/User.js');

// Route for creating a new comment
router.post("/create", async (req, res) => {
  try {
    const newAnswer = new Answer(req.body);
    const savedAnswer = await newAnswer.save();

    // If the comment is a reply, update the parent comment's replies
    if (req.body.parentId) {
      await Answer.findByIdAndUpdate(req.body.parentId, {
        $push: { replies: savedAnswer._id }
      });
    }

    res.status(201).json(savedAnswer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route for deleting a comment by its ID
router.delete("/:id", async (req, res) => {
  try {
    await Answer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Reply has been deleted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route for retrieving comments by post ID
router.get("/answer/:postId", async (req, res) => {
  try {
    const answers = await Answer.find({ postId: req.params.postId, parentId: null })
      .populate({
        path: 'replies',
        populate: { path: 'replies' } // Populate nested replies
      });
    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//likes dislikes
router.route('/update/:id').post((req, res) => {
  Answer.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: req.body.likes, dislikes: req.body.dislikes } },
    { new: true }
  )
    .then(answer => res.json(answer))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
