const User = require("../models/user");

exports.form = (req, res) => {
  res.render("loginForm", { title: "Login" });
};

exports.submit = (req, res, next) => {
  User.authentificate(req.body.loginForm, (err, data) => {
    if (err) return next(err);
    if (data) {
      req.session.userEmail = data.email;

      res.redirect("/");
    } else {
      console.log("Имя или Пароль не верный");
      res.redirect("back");
    }
  });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
};
