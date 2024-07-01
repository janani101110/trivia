//import express to create web servers and defien routed for handling HTTP requests.
const express = require("express");
const router = express.Router();
const Projectpost = require("../models/Projectpost"); //import Mongoose model 'Projectpost'
//const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');
const { sendEmail } = require('./nodemailer.js');

//create a new project post
router.post("/create", async (req, res) => {
  try {
    const { email, ...rest } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const newProjectpost = new Projectpost({
      ...rest,
      email, // Include the email in the new project post
      approved: false, // set the default approval status to false
    });
    const savedProjectpost = await newProjectpost.save();

    // Send email to the user
    const emailSubject = 'Your project article has been created!';
    const emailText = `Your project article "${savedProjectpost.project_name}" has been successfully created.`;

    await sendEmail(email, emailSubject, emailText);

    res.status(200).json(savedProjectpost);
  } catch (err) {
    console.error('Error creating project post or sending email:', err);
    res.status(500).json(err);
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
      { approved: true, rejected: false },
      { new: true }
    );
    if (!projectpost) {
      return res.status(404).json({ message: "Project post not found" });
    }
    // Send email to the user
    const userEmail = projectpost.email; // Get the email from the project post document
    const postUrl = `http://localhost:3000/projectseemore/${projectpost._id}`; // Adjust the URL to your frontend blog post URL

    const emailSubject = 'Your project article has been approved!';
    const emailText = `Your project article "${projectpost.project_name}" has been successfully approved. You can view it at: ${postUrl}`;

    await sendEmail(userEmail, emailSubject, emailText);

    res.status(200).json(projectpost);
  } catch (err) {
    console.error('Error approving project post or sending email:', err);
    res.status(500).json(err);
  }
});


// Reject a project post
router.put("/reject/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const projectpost = await Projectpost.findByIdAndUpdate(
      id,
      { rejected: true, approved: false }, // Set rejected to true
      { new: true }
    );
    if (!projectpost) {
      return res.status(404).json({ message: "Project post not found" });
    }
    // Send email to the user
    const userEmail = projectpost.email; // Get the email from the project post document

    const emailSubject = 'Your project article has been rejected!';
    const emailText = `Your project article "${projectpost.project_name}" has been rejected.`;

    await sendEmail(userEmail, emailSubject, emailText);

    res.status(200).json(projectpost);
  } catch (err) {
    console.error('Error rejecting project post or sending email:', err);
    res.status(500).json(err);
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

// Add like to a project post
router.post("/:id/like", async (req, res) => {
  try {
    const projectPost = await Projectpost.findById(req.params.id);
    if (!projectPost) {
      return res.status(404).json({ message: "Project post not found" });
    }
    projectPost.likes += 1;
    await projectPost.updateOne({ likes: projectPost.likes }, { timestamps: false });
    res.json({ likes: projectPost.likes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Retrieve all project posts or filter by date range and status
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

    const projectposts = await Projectpost.find(filter);
    res.status(200).json(projectposts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Generate PDF and download enrollments
router.post("/download-enrollments", async (req, res) => {
  try {
    const { enrollments } = req.body;

    const doc = new PDFDocument();
    let chunks = [];
    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => {
      const result = Buffer.concat(chunks);
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Length': result.length,
        'Content-Disposition': 'attachment; filename=enrollments_report.pdf'
      });
      res.end(result);
    });

    doc.fontSize(16).text('Enrollments Report', { align: 'center' });

    enrollments.forEach(post => {
      doc.fontSize(12).text(`Name: ${post.name}`);
      doc.fontSize(12).text(`Email: ${post.email}`);
      doc.fontSize(12).text(`Date: ${new Date(post.createdAt).toLocaleDateString()}`);
      doc.moveDown();
    });

    doc.end();

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try{
      const posts = await Post.find({ postedBy: req.params.userId });
      res.status(200).json(posts);
  } catch(err) {
      res.status(500).json(err);
  }
})

module.exports = router;
