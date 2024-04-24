const express = require('express');
const router=express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const Post=require('../models/blogPost.js');
const verifyToken = require('../middleware/verifyToken.js');

//Create 
router.post("/create" ,async (req, res) => {
    try{
        const newPost = new Post(req.body);
        const savedPost=await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
})


//Update
router.put("/:id",verifyToken, async (req, res) => {
    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedPost);
    }catch(err){
        res.status(500).json(err);
    }
})



//Delete
router.delete("/:id",verifyToken, async (req, res) => {
    try{
        await Post.findByIdAndDelete(req.params.id);;
       res.status(200).json("Post has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
})





//Get Post Details
router.get("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
})



//Get All Posts of a user
router.get("/user/:userId", async (req, res) => {
    try{
        const posts = await Post.find({ postedBy: req.params.userId });
        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json(err);
    }
})

//Get All Posts with pagination route
router.get("/", async (req, res) => {
    try{

        // Fetch posts
        const posts = await Post.find();
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
})



//Search Posts
router.get("/search/:prompt", async (req, res) => {
    try{
        const posts=await Post.find({title:{$regex:req.params.prompt,$options:"i"}})
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
})

router.put("/like", (req,res) => {
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).execute((err, result)=>{
        if(err){
            return res.status(422).json({error:error})
        }else{
            res.json(result)
        }
    })
})

router.put("/unlike", (req,res) => {
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).execute((err, result)=>{
        if(err){
            return res.status(422).json({error:error})
        }else{
            res.json(result)
        }
    })
})


module.exports = router;