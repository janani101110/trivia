const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const cors = require('cors');


require('dotenv').config();



passport.use(User.createStrategy());




passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ 
      userId: profile.id, 
      username: profile.displayName,
      profilePicture: profile.photos[0].value
    }, function (err, user) {
      if (err) { return cb(err); }
      // Generate JWT token
      const token=jwt.sign({_id:user._id},process.env.accessToken_secret,{expiresIn:"1h"})
      return cb(null, user, token);
    });
  }
));
  

  
passport.serializeUser(function(user, done) {
  done(null, user.id);
});


passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    console.log("deserializeUser: ", user);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
