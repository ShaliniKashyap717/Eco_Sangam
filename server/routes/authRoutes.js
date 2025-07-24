const express = require('express');
const passport = require('passport');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// Local Auth
router.post('/signup', signup);
router.post('/login', login);

// Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5175/login',
    session: true
  }),
  (req, res) => {
    res.redirect('http://localhost:5175/home');
  }
);

router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ msg: 'Logout failed' });
    res.clearCookie('connect.sid');
    res.status(200).json({ msg: 'Logged out' });
  });
});

router.get('/google/current_user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ msg: 'Unauthorized' });
  }
});

module.exports = router;
