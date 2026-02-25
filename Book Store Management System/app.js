require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// DB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://harsh:harsh123@cluster0.dwbyhvj.mongodb.net/?appName=Cluster0')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ DB Error:', err));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'bookstore_secret_2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.session.admin || null;
  next();
});

// Routes
app.use('/', require('./routes/user'));
app.use('/admin', require('./routes/admin'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 8980;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
