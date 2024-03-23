const User = require("../models/db");
const jwt = require("jsonwebtoken");
const logger = require("../logger/index_logger");
const bycrypt=require("bcrypt");
require("dotenv").config();

exports.form = (req, res) => {
  res.render("loginForm", { title: "Login" });
  logger.error("Зашли");
};

function authentificate(dataForm, cb) {
  User.findByEmail(dataForm.email, (err, user) => {
    if (err) return cb(err);
    if (!user) return cb();

    const result = bcrypt.compare(
      dataForm.password,
      user.password,
      (err, result) => {
        if (result) return cb(null, user);
        cb();
      }
    );
  });
}
exports.submit = (req, res, next) => {
  User.authentificate(req.body.loginForm, (err, data) => {
    if (err) return next(err);
    if (!data) {
      res.error("Имя или пароль неверный");
      res.redirect("back"); //
    } else {
      req.session.userEmail = data.email;
      req.session.userName = data.name;
      // генерация токена
      const jwt_time = process.env.jwtTime;
      const token = jwt.sign({ name: data.email }, process.env.jwtToken, {
        expiresIn: jwt_time,
      });
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: jwt_time,
      });

      res.redirect("/");
      logger.info("Token login " + " transferred successfully");
    }
  });
};

exports.logout = function (req, res, next) {
  res.clearCookie("jwt");
  res.clearCookie("connect.sid");

  req.session.destroy((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};
