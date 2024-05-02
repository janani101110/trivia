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
    res.status(500).json(err);
  }
});

//retrieving a specific project post by its ID(uses HTTP get method and expects the ID as a parameter in the URL 'req.params.id')
router.get("/:id", async (req, res) => {
  try {
    const projectpost = await Projectpost.findById(req.params.id);
    res.status(200).json(projectposts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//route for retrieving all project posts
router.get("/", async (req, res) => {
  try {
    const projectposts = await Projectpost.find();
    res.status(200).json(projectposts);
  } catch (err) {
    res.status(500).json(err);
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
    res.status(200).json(projectpost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
