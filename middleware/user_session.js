const { User } = require("../models/db");

module.exports = async function (req, res, next) {
  try {
    if (req.session.userEmail) {
      const userData = User.findOne({
        where: { email: req.session.userEmail },
      });
      if (userData) req.user = res.locals.user = userData;
    }
    if (req.session.passport) {
      res.locals.user = req.session.passport.user;
    }
    next();
  } catch (err) {
    return next(err);
  }
};
