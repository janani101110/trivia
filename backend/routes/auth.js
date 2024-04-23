const express = require('express');
const router=express.Router();
const User = require ('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require("passport");
require('dotenv').config();

const CLIENT_URL = "http://localhost:3000/home";


router.get("/google", 
passport.authenticate('google', { scope: ['profile'] })
);

router.get(
  "/google/callback",
  passport.authenticate("google-signup", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error:true,
    message: "Log in failure"
  })
})

router.get("/login/success", (req, res) =>{
  if(req.user){

    console.log("login success ", req.user);
    res.status(200).json({
      error: false,
      message: "Successfully logged in",
      user: req.user
    });
    console.log(res.message)
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});


//Login Route
router.post('/login',async function(req, res){
  try{
    const user=await User.findOne({email:req.body.email})
   
    if(!user){
        return res.status(404).json("User not found!")
    }
    const match=await bcrypt.compare(req.body.password,user.password)
    
    if(!match){
        return res.status(401).json("Wrong credentials!")
    }
    const token=jwt.sign({_id:user._id,email:user.email},process.env.accessToken_secret,{expiresIn:"1h"})
    const {password,...info}=user._doc
    //console.log(token);
    res.cookie("token",token).status(200).json(info)

}
catch(err){
    res.status(500).json(err)
}
})

//signup Route
router.post('/signup', async (req, res) => {
  try{
    const {username,email,password}=req.body
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hashSync(password,salt)
    const newUser=new User({username,email,password:hashedPassword})
    const savedUser=await newUser.save()
    res.status(200).json(savedUser)

}
catch(err){
    res.status(500).json(err)
}
});

// Logout route
router.get('/logout', function(req, res) {
  req.logout(function(err) {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).send("Error during logout");
    }
    res.clearCookie('connect.sid'); // Clear session cookie
    res.redirect('http://localhost:3000/'); // Redirect to homepage
  });
});

//get User details of particular user
router.get("/details/:id", async (req, res) => {
  try{
      const user = await User.findById(req.params.id)
      res.status(200).json(user);
  }catch(err){
      res.status(500).json(err);
  }
})


module.exports=router;