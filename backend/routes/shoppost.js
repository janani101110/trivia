const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Shoppost = require("../models/Shoppost");
const Comment = require("../models/Comment");
const verifyToken = require("../verifyToken");

router.route("/create").post((req, res) => {
  const { name, description, price, contact, imageUrl } = req.body;

  const newShoppost = new Shoppost({
    name,
    description,
    price,
    contact,
    imageUrl,
    
  });

  newShoppost
    .save()
    .then((savedShoppost) => {
      // Send a success response with the saved shop post data
      res
        .status(201)
        .json({
          message: "Shop post created successfully",
          shoppost: savedShoppost,
        });
    })
    .catch((error) => {
      // Handle any errors that occur during the save operation
      console.error("Error creating shop post:", error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the shop post" });
    });
});

router.get("/getpost", async (req, res) => {
  try {
    const shoppost = await Shoppost.find();
    res.send({ status: "ok", data: shoppost });
  } catch (err) {
    console.log(err);
  }
});

router.get("/getpost/:id", async (req, res) => {
  try {
    const shoppost = await Shoppost.findById(req.params.id);
    res.status(200).json(shoppost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
