const User = require("../models/user");

// module.exports = (req, res, next) => {
//   const userEmail = req.session.userEmail;
//   if (!userEmail) return next();
//   User.findByName(userEmail, (err, userData) => {
//     if (err) return next(err);
//     if (userData) {
//       req.user = res.locals.user = userData;
//     }
//     next();
//   });
// };

module.exports = (req, res, next) => {
  if (req.session.userEmail) {
    User.findByName(req.session.userEmail, (err, userData) => {
      if (err) return next(err);
      if (userData) {
        req.user = res.locals.user = userData;
      }
    });
  }
  next();
};
