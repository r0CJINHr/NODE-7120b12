const User = require("../models/user");
const jwt = require("jsonwebtoken");
const logger = require("../logger/index_logger");
// require("dotenv").config();

exports.form = (req, res) => {
  res.render("registerForm", { title: "Register" });
};

exports.submit = (req, res, next) => {
  User.findByEmail(req.body.dataForm.email, (err, user) => {
    if (err) return next(err);
    if (user) {
      res.error("Такой пользователь в базе есть");
      res.redirect("/");
    } else {
      User.create(req.body.dataForm, (err) => {
        if (err) return next(err);
        req.session.userEmail = req.body.dataForm.email;
        req.session.userName = req.body.dataForm.name;
        res.redirect("/");
      });
      // генерация токена
      const jwt_time = process.env.jwtTime;
      const token = jwt.sign({ name: req.body.dataForm.email }, process.env.jwtToken, {
        expiresIn: jwt_time,
      });
      //создание cookies для пользователя
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: jwt_time,
      });
      logger.info("First token login " + " transferred successfully");
      res.redirect("/");
    }
  });
};

