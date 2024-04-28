// Importing express module for handling routes
const express = require("express");
// Creating a router instance to handle comment routes
const router = express.Router();
// Importing the ResoComment model for interacting with comments
const ResoComment = require("../models/ResoComment");

// Route for creating a new comment
router.post("/create", async (req, res) => {
  try {
    // Creating a new comment instance based on the request body
    const newComment = new ResoComment(req.body);
    // Saving the new comment to the database
    const savedComment = await newComment.save();
    // Sending a success response with the saved comment data
    res.status(200).json(savedComment); // Change status to 201 for resource created
  } catch (err) {
    // Handling errors if any occur during the process
    res.status(500).json({ error: err.message }); // Better error handling
  }
});

// Route for deleting a comment by its ID
router.delete("/:id", async (req, res) => {
  try {
    // Finding and deleting the comment by its ID
    await ResoComment.findByIdAndDelete(req.params.id);
    // Sending a success response after deleting the comment
    res.status(200).json({ message: "Comment has been deleted!" });
  } catch (err) {
    // Handling errors if any occur during the process
    res.status(500).json({ error: err.message });
  }
});

// Route for retrieving comments by post ID
router.get("/post/:postId", async (req, res) => {
  try {
    // Finding comments associated with the specified post ID
    const ResoComments = await ResoComment.find({ postId: req.params.postId });
    // Sending a success response with the retrieved comments
    res.status(200).json(ResoComments);
  } catch (err) {
    // Handling errors if any occur during the process
    res.status(500).json({ error: err.message });
  }
});

// Exporting the router to make it available for use in other files
module.exports = router;
