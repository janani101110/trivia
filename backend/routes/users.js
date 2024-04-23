const express = require('express');
const router=express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const verifyToken = require('../middleware/verifyToken');


//Delete
router.delete("/:userId",verifyToken, async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        //delete all posts and comments of the user
       // await Post.deleteMany({username: req.params.id});
       // await Comment.deleteMany({username: req.params.id});
       res.status(200).json("User has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
})

router.get("/auth/user", verifyToken, (req, res) => {
    res.json(req.user);
  });



//Get User
router.get("/:userId", async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(info);
    }catch(err){
        res.status(500).json(err);
    }
})



module.exports=router;