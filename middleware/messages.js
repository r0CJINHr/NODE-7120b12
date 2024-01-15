// const User = require("../models/user");

function message(req) {
  return (msg, type) => {
    type = type || "info";
    let sess = req.session;
    sess.message = sess.message || [];
    sess.message.push({ type: type, string: msg });
  };
}

module.exports = function (req, res, next) {
  res.message = message(req);
  res.error = (msg) => {
    return res.message(msg, "error");
  };
  res.locals.message = req.session.message || [];
  res.locals.removeMessage = function () {
    req.session.message = [];
  };
  next();
};
