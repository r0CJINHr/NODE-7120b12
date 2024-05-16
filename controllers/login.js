const { User } = require("../models/db");
const jwt = require("jsonwebtoken");
const logger = require("../logger/index_logger");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.form = (req, res) => {
  res.render("loginForm", { title: "Login" });
  logger.error("Зашли");
};

async function authentificate(dataForm, cb) {
  try {
    const user = await User.findOne({ where: { email: dataForm.email } });
    if (!user) return cb();
    const result = await bcrypt.compare(dataForm.password, user.password);
    if (result) return cb(null, user);
    return cb();
  } catch (err) {
    return cb(err);
  }
}

exports.submit = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.loginForm } });
    if (!user) {
      const result = await bcrypt.compare(dataForm.password, user.password);
    }
  } catch (error) {}
  authentificate(req.body.loginForm, (err, data) => {
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
