module.exports.isAdmin = (req, res, next) => {
  if (req.session.admin) {
    return next();
  }
  req.flash('error', 'Please login as admin to access this page.');
  res.redirect('/auth/login');
};
