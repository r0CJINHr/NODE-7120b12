const { User } = require("../models/db");
const jwt = require("jsonwebtoken");
const logger = require("../logger/index_logger");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.form = (req, res) => {
  res.render("registerForm", { title: "Register" });
};

exports.submit = async (req, res, next) => {
  try {
    const { name, email, password, age } = req.body.dataForm;
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      res.error("Такой пользователь в базе есть");
      res.redirect("/");
    } else {
      // хешируем пароль для записи в базу данных
      const SALT = Number(process.env.SALT);
      const salt = await bcrypt.genSalt(SALT);
      const hash = await bcrypt.hash(password, salt);

      await User.create({ name, email, password: hash, age });
      req.session.userEmail = email;
      req.session.userName = name;
      res.redirect("/");
      // // генерация токена
      const jwt_time = process.env.jwtTime;
      const token = jwt.sign(
        { name: req.body.dataForm.email },
        process.env.jwtToken,
        {
          expiresIn: jwt_time,
        }
      );
      //создание cookies для пользователяпока выкинули в угоду passportJS
      logger.info("First token  "+token+ "transferred successfully")
    }
  } catch (err) {
    return next(err);
  }
};
