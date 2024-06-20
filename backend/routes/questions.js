

const express = require("express");
const router = express.Router();
const Questions = require("../models/questions");


// create new post
router.post("/create", async (req, res) => {
    try {
      // Creating a new post instance using the ResoPost model
      const newQuestion = new Questions(req.body);
      // Saving the new post to the database
      const savedQuestion = await newQuestion.save();
      // Sending a success response with the saved post data
      res.status(200).json(savedQuestion);
    } catch (err) {
      // Handling errors if any occur during the process
      res.status(500).json(err);
    }
  }); 
//get all post on the forum.jsx
  router.get("/", async (req, res) => {
    try {
      const questions = await Questions.find();
      res.send({ status: "ok", data: questions });
    } catch (err) {
      console.log(err);
    }
  }); 


  //view post details
  router.get("/:id", async (req, res) => {
    try {
        const question = await Questions.findById(req.params.id); // Corrected findById method
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json(question);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const incrementViewCount = async (req, res) => {
  try {
    const { postId } = req.params;

    // Fetch the current question from the database
    const question = await Questions.findById(postId);
    if (!question) {
      return res.status(404).json({ status: "error", message: "Question not found" });
    }

    // Increment the view count
    question.viewCount = (question.viewCount || 0) + 1;

    // Save the updated question back to the database
    await question.save();

    res.status(200).json({ status: "success", message: "View count incremented", updatedQuestion: question });
  } catch (error) {
    console.error("Error incrementing view count:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

// Route to increment view count for a specific question
router.put('/views/:postId', incrementViewCount);



module.exports = router;

