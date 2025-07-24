const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:8890/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;

  let user = await User.findOne({ email });
  if (!user) {
    user = new User({
      name: profile.displayName,
      email,
      password: 'google-auth' // dummy value
    });
    await user.save();
  }
  return done(null, user);
}));
