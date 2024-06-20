const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Shoppost = require("../models/Shoppost");

const verifyToken = require("../verifyToken");
const cron = require('node-cron');
const nodemailer = require('nodemailer');

const scheduleEmail = (shoppost) => {
  const emailTime = new Date(shoppost.createdAt);
  emailTime.setMinutes(emailTime.getDate() + 7);  // Corrected the addition of minutes

  // Ensure the minutes and hours are two digits for cron format
  const cronMinutes = emailTime.getMinutes().toString().padStart(2, '0');
  const cronHours = emailTime.getHours().toString().padStart(2, '0');

  const cronTime = `${cronMinutes} ${cronHours} ${emailTime.getDate()} ${emailTime.getMonth() + 1} *`;
  console.log(`Cron time: ${cronTime}`);  // Log the cron time for debugging

  cron.schedule(cronTime, () => {
    console.log('Running cron job to send email');
    sendEmail(shoppost.userEmail);
  });
};

const sendEmail = (to) => {
  console.log(`Sending email to: ${to}`);  // Log the recipient email for debugging

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'triviatechnology2024@gmail.com',
      pass: 'unpg lgmc akgd xmms'
    }
  });

  let mailOptions = {
    from: 'triviatechnology2024@gmail.com',
    to: to,
    subject: 'Your post reminder',
    text: 'This is a reminder about your post. Your post will be deleted soon. You can repost if you want. Thank you!'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);  // Log the error
      return;
    }
    console.log('Email sent: ' + info.response);
  });
};

router.route("/create").post((req, res) => {
  const { name, description, price, contact, imageUrl, userEmail } = req.body;

  const newShoppost = new Shoppost({
    name,
    description,
    price,
    contact,
    imageUrl,
    userEmail,
  });

  newShoppost
    .save()
    .then((savedShoppost) => {
      console.log('Shop post saved:', savedShoppost);  // Log the saved shop post for debugging
      scheduleEmail(savedShoppost);  // Schedule email after saving the shop post
      res.status(201).json({
        message: "Shop post created successfully",
        shoppost: savedShoppost,
      });
    })
    .catch((error) => {
      console.error("Error creating shop post:", error);
      res.status(500).json({ error: "An error occurred while creating the shop post" });
    });
});
router.get("/getpost", async (req, res) => {
  try {
    const shoppost = await Shoppost.find();
    res.send({ status: "ok", data: shoppost });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred while fetching shop posts" });
  }
});

router.get("/getpost/:id", async (req, res) => {
  try {
    const shoppost = await Shoppost.findById(req.params.id);
    res.status(200).json(shoppost);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching the shop post" });
  }
});

router.delete("/:id",async (req,res)=>{
  try{
    await Shoppost.findByIdAndDelete(req.params.id);
    res.status(200).json("post has been deleted");
  } catch(err){
    res.status(500).json(err);
  }
});

router.get("/analytics", async (req, res) => {
  try {
    const remainingAds = await Shoppost.countDocuments({}); // Count all remaining ads
    const deletedAds = await Shoppost.countDocuments({ deleted: true }); // Count deleted ads if you have a deleted flag
    const date = new Date();
    res.status(200).json({ date, remainingAds, deletedAds });
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching analytics data" });
  }
});



module.exports = router;