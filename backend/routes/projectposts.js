//import express to create web servers and defien routed for handling HTTP requests.
const express = require("express");
const router = express.Router();
const Projectpost = require("../models/Projectpost"); //import Mongoose model 'Projectpost'

//create a new project post
router.post("/create", async (req, res) => {
  try {
    const newProjectpost = new Projectpost({ 
      ...req.body,
      approved: false,   //set the default approval status to false
    });
    const savedProjectpost = await newProjectpost.save();
    res.status(200).json(savedProjectpost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//retrieving a specific project post by its ID(uses HTTP get method and expects the ID as a parameter in the URL 'req.params.id')
router.get("/:id", async (req, res) => {
  try {
    const projectpost = await Projectpost.findById(req.params.id);
    if (!projectpost) {
      return res.status(404).json({ message: "Project post not found" });
    }
    res.status(200).json(projectpost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



//route for retrieving all project posts
router.get("/", async (req, res) => {
  try {
    const projectposts = await Projectpost.find();
    res.status(200).json(projectposts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Approve a project post
router.put("/approve/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const projectpost = await Projectpost.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true }
    );
    if (!projectpost) {
      return res.status(404).json({ message: "Project post not found" });
    }
    res.status(200).json(projectpost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reject a project post
router.put("/reject/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const projectpost = await Projectpost.findByIdAndUpdate(
      id,
      { rejected: true }, // Set rejected to true
      { new: true }
    );
    if (!projectpost) {
      return res.status(404).json({ message: "Project post not found" });
    }
    res.status(200).json(projectpost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all rejected project posts
router.get("/rejected", async (req, res) => {
  try {
    const rejectedPosts = await Projectpost.find({ rejected: true });
    res.status(200).json(rejectedPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get project posts by user name and status
router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const projectposts = await Projectpost.find({ name, approved: true });
    res.status(200).json(projectposts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

