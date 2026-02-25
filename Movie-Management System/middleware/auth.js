const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    return next();
  }
  req.flash('error_msg', 'Please login to access admin panel');
  res.redirect('/admin/login');
};

module.exports = { isAdmin };
