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

/*
passport.use('google-signup', new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/signup/callback",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  scope: ["profile", "email"]
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ userId: profile.id });
    if (existingUser) {
      // User already exists, return an error
      return done(null, existingUser);
    } else {
      const newUser = await User.create
      ({ 
        userId: profile.id, 
        username: profile.displayName, 
        email: profile.emails,
        profilePicture: profile._json.picture,
      });
      return done(null, newUser);
    }
  } catch (err) {
    return done(err, null);
  }
}));



passport.use('google-signin', new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/signin/callback",
  scope: ["profile", "email"],
},
  function (accessToken, refreshToken, profile, done) {
    User.findOne({ userId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            // User exists, generate token
          //  accessToken = jwt.sign( { userId: existingUser.userId }, process.env.accessToken_secret, { expiresIn: '5h' });
          //  console.log('generated token : ', accessToken);
            // Save token to user document
          //  existingUser.token = accessToken;
          existingUser.save()
              .then(() => {
                return done(null, existingUser);
              })} else {
            // User does not exist, you might want to create a new user here
            return done(null, false, { message: 'User does not exist' });
          }
        })
        .catch((err) => {
          return done(err, null);
        });
  }));



  passport.serializeUser(function (user, done) {
    done(null, user.userId);
  });
  
  passport.deserializeUser((userId, done) => {
    console.log("deserializeUser : ",userId);
    done(null, userId)
  })
*/