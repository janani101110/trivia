const express = require("express");
const router = express.Router();
const ResoComment = require("../models/ResoComment");
const ResoPost = require("../models/ResoPost"); // Import the ResoPost model
const Rating = require("../models/Rating");

// Route for creating a new post
router.post("/create", async (req, res) => {
  try {
    // Creating a new post instance using the ResoPost model
    const newPost = new ResoPost({ 
      ...req.body,
      approved: false,   //set the default approval status to false
    });;
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
    const posts = await ResoPost.find({ postedBy: req.params.userId });
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


// Approve a resources post
router.put("/approve/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await ResoPost.findByIdAndUpdate(
      id,
      { approved: true, rejected: false },
      { new: true }
    );
    if (!posts) {
      return res.status(404).json({ message: "Resources post not found" });
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reject a resources post
router.put("/reject/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await ResoPost.findByIdAndUpdate(
      id,
      { rejected: true, approved: false}, // Set rejected to true
      { new: true }
    );
    if (!posts) {
      return res.status(404).json({ message: "Resources post not found" });
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all rejected resources posts
router.get("/rejected", async (req, res) => {
  try {
    const rejectedPosts = await ResoPost.find({ rejected: true });
    res.status(200).json(rejectedPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get resources posts by user name and status
router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const posts = await ResoPost.find({ name, approved: true });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve all resources posts or filter by date range and status
router.get("/", async (req, res) => {
  try {
    const { action, topic, range, month} = req.query;
    let filter = {};
    
    // Add filtering by status
    if (action) {
      if (action === "approved") filter.approved = true;
      if (action === "rejected") filter.rejected = true;
      if (topic === "shop_posts") filter.topic = "shop_posts";
    }

    // Add filtering by topic
    if (topic) {
      if (topic === "projects") filter.topic = "projects";
      if (topic === "resources") filter.topic = "resources";
      if (topic === "blogs") filter.topic = "blogs";
      if (topic === "shop_posts") filter.topic = "shop_posts";
    }

    // Add filtering by date range
    if (range) {
      const now = new Date();
      if (range === "daily") {
        filter.createdAt = {
          $gte: new Date(now.setHours(0, 0, 0, 0)),
          $lt: new Date(now.setHours(23, 59, 59, 999))
        };
     /* } else if (range === "weekly") {
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        filter.createdAt = { $gte: startOfWeek };*/
      } else if (range === "monthly") {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        filter.createdAt = { $gte: startOfMonth };
      }
    }

    const posts = await ResoPost.find(filter);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exporting the router to make it available for use in other files
module.exports = router;
