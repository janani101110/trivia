const express = require("express");
const router = express.Router();
const ResoComment = require("../models/ResoComment");
const ResoPost = require("../models/ResoPost"); // Import the ResoPost model
const Rating = require("../models/Rating");

// Route for creating a new post
router.post("/create", async (req, res) => {
  try {
    // Creating a new post instance using the ResoPost model
    const newPost = new ResoPost(req.body);
    // Saving the new post to the database
    const savedPost = await newPost.save();
    // Sending a success response with the saved post data
    res.status(200).json(savedPost);
  } catch (err) {
    // Handling errors if any occur during the process
    res.status(500).json(err);
  }
});

// Route for updating an existing post
router.put("/:id", async (req, res) => {
  try {
    // Finding and updating the post by its ID
    const updatedPost = await ResoPost.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    // Sending a success response with the updated post data
    res.status(200).json(updatedPost);
  } catch (err) {
    // Handling errors if any occur during the process
    res.status(500).json(err);
  }
});

// Route for deleting a post by its ID
router.delete("/:id", async (req, res) => {
  try {
    // Finding and deleting the post by its ID
    await ResoPost.findByIdAndDelete(req.params.id);
    // Deleting associated comments with the deleted post
    await ResoComment.deleteMany({ postId: req.params.id });
    // Sending a success response after deleting the post
    res.status(200).json("Post has been deleted");
  } catch (err) {
    // Handling errors if any occur during the process
    res.status(500).json(err);
  }
});

// Route for retrieving details of a post by its ID
router.get("/:id", async (req, res) => {
  try {
    // Finding and retrieving the post by its ID
    const post = await ResoPost.findById(req.params.id);
    // Sending a success response with the retrieved post data
    res.status(200).json(post);
  } catch (err) {
    // Handling errors if any occur during the process
    res.status(500).json(err);
  }
});

// Route for retrieving all posts of a specific user by their user ID
router.get("/user/:userId", async (req, res) => {
  try {
    // Finding and retrieving all posts of the specified user by their user ID
    const posts = await ResoPost.find({ userId: req.params.userId });
    // Sending a success response with the retrieved posts
    res.status(200).json(posts);
  } catch (err) {
    // Handling errors if any occur during the process
    res.status(500).json(err);
  }
});

// Route for retrieving all posts, optionally filtered by a search query
router.get("/", async (req, res) => {
  // Extracting the search query from the request
  const query = req.query;
  console.log("Received query:", query); // Debug: Log the received query
  try {
    // Constructing a search filter based on the query
    const searchFilter = {
      title: { $regex: query.search, $options: "i" },
    };
    // Retrieving all posts, filtered by the search query if present
    const posts = await ResoPost.find(query.search ? searchFilter : null);
    console.log("Filtered posts:", posts); // Debug: Log the filtered posts
    // Sending a success response with the retrieved posts
    res.status(200).json(posts);
  } catch (err) {
    // Handling errors if any occur during the process
    console.log("Error retrieving posts:", err); // Debug: Log any errors
    res.status(500).json(err);
  }
});

// Route for posting a new rating
router.post("/ratings", async (req, res) => {
  try {
    const { postId, userId, rating } = req.body;

    // Check if the user has already rated the post
    const existingRating = await Rating.findOne({ postId, userId });

    if (existingRating) {
      // Update the existing rating
      existingRating.rating = rating;
      await existingRating.save();
      res.status(200).json(existingRating);
    } else {
      // Create a new rating
      const newRating = new Rating({ postId, userId, rating });
      await newRating.save();
      res.status(200).json(newRating);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for fetching the average rating of a post
router.get("/ratings/:postId", async (req, res) => {
  try {
    const { postId } = req.params;

    // Calculate the average rating
    const ratings = await Rating.find({ postId });
    const averageRating = ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length || 0;

    res.status(200).json({ averageRating });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Exporting the router to make it available for use in other files
module.exports = router;
