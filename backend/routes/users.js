const express=require('express')
const router=express.Router()
const User=require("../models/User")
const bcrypt=require('bcrypt')
const Shoppost=require('../models/Shoppost')
const Comment=require('../models/Comment')


//update
router.put("/:id",async(req,res)=>{
  try{
    if(req.body.password){
      const salt=await bcrypt.genSalt(10)
      req.body.password=await bcrypt.hashSync(req.body.password,salt)
    }
    const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    res.status(200).json(updatedUser)
  }
  catch(err){
    res.status(500).json(err) 
  }
})

//delete
router.delete("/:id",async(req,res)=>{ 
  try{
    await User.findByIdAndDelete(req.params.id)
    await Shoppost.deleteMany({userId:req.params.id})
    await Comment.deleteMany({userId:req.params.id})
    res.status(200).json("user has been deleted")
  }
  catch(err){
    res.status(500).json(err) 
  }
})

//get user
router.get("/:id",async(req,res)=>{
  try{
    const user=await User.findById(req.params.id)
    const {password,...info}=user._doc
    res.status(200).json(info)
  }
  catch(err){
    res.status(500).json(err) 
  }
})



module.exports=router