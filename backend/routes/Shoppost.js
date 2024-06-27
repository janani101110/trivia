const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Shoppost = require("../models/Shoppost");
const verifyToken = require("../middleware/verifyToken");
const cron = require('node-cron');
const nodemailer = require('nodemailer');



const scheduleEmail = (shoppost) => {
  const emailTime = new Date(shoppost.createdAt);
  emailTime.setMinutes(emailTime.getMinutes() + 5);  // Add 5 days to the createdAt date

  // Ensure the minutes and hours are two digits for cron format
  const cronMinutes = emailTime.getMinutes().toString().padStart(2, '0');
  const cronHours = emailTime.getHours().toString().padStart(2, '0');
  const cronDay = emailTime.getDate().toString().padStart(2, '0');
  const cronMonth = (emailTime.getMonth() + 1).toString().padStart(2, '0');

  const cronTime = `${cronMinutes} ${cronHours} ${cronDay} ${cronMonth} *`;
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
      pass: 'unpg lgmc akgd xmms',
    },
  });

  let mailOptions = {
    from: 'triviatechnology2024@gmail.com',
    to: to,
    subject: 'Your post reminder',
    text: 'This is a reminder about your post. Your post will be deleted soon. You can repost if you want. Thank you!',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);  // Log the error
      return;
    }
    console.log('Email sent: ' + info.response);
  });
};

// Example usage:
// const exampleShoppost = {
//   createdAt: new Date(),  // For testing purposes, use the current date
//   userEmail: 'example@example.com',
// };

// scheduleEmail(exampleShoppost);


router.route("/create").post((req, res) => {
  const { name, description, price, contact, imageUrl, userEmail,postedBy } = req.body;

  const newShoppost = new Shoppost({
    name,
    description,
    price,
    contact,
    imageUrl,
    userEmail,
    postedBy,
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
// router.get("/user/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     console.log(`Fetching shop posts for user ID: ${userId}`); // Log user ID
//     const shopPosts = await ShopPost.find({ postedBy: userId });
//     if (!shopPosts || shopPosts.length === 0) {
//       console.error(`No shop posts found for user ID: ${userId}`);
//       return res.status(404).json({ error: 'No shop posts found' });
//     }
//     res.status(200).json(shopPosts);
//   } catch (err) {
//     console.error('Error fetching shop posts:', err); // Log the error
//     res.status(500).json({ error: 'Error fetching shop posts' });
//   }
// });
router.get("/user/:userId", async (req, res) => {
  try {
    const shopPosts = await Shoppost.find({ postedBy: req.params.userId });
    res.status(200).json(shopPosts);
  } catch (err) {
    console.error('Error fetching shop posts:', err); // Log the error details
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;