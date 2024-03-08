const User = require("../models/user");

module.exports = function (req, res, next) {
  if (req.session.userEmail) {
    User.findByEmail(req.session.userEmail, (err, userData) => {
      if (err) return next(err);
      if (userData) req.user = res.locals.user = userData;
    });
  }
  if (req.session.passport) {
    res.locals.user = req.session.passport.user;
  }
  return next();
};
