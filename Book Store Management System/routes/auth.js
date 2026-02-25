const express = require('express');
const router = express.Router();

// GET Login Page
router.get('/login', (req, res) => {
  if (req.session.admin) return res.redirect('/admin/dashboard');
  res.render('auth/login');
});

// POST Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USERNAME || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

  if (username === adminUser && password === adminPass) {
    req.session.admin = { username, role: 'admin' };
    req.flash('success', `Welcome back, ${username}!`);
    res.redirect('/admin/dashboard');
  } else {
    req.flash('error', 'Invalid username or password.');
    res.redirect('/auth/login');
  }
});

// GET Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
