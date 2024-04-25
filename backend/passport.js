const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const User = require('./models/User');

const GOOGLE_CLIENT_ID="966360709234-l5ds5assso6oskc0vddcu3dsebue9sfq.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET="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"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
        if (err) {
            return cb(err, null);
          }
          return cb(null, user);     
    });
  }
));


passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  });