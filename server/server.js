const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const passportSetup = require('./config/passport');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ecoGoalRoutes = require('./routes/ecoGoalRoutes');
const tipsRoute = require("./routes/tipsRoute");
const geminiRoutes = require('./routes/geminiRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5175",
  credentials: true
}));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.use(bodyParser.json());

app.use('/completedecogoal', ecoGoalRoutes);
app.use('/api/gemini', geminiRoutes);
app.use("/api/tips", tipsRoute);
console.log("✅ /test route registered");
app.get('/test', (req, res) => {
  res.send("test is fine");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
