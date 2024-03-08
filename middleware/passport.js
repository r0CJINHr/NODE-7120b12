const YandexStrategy = require("passport-yandex").Strategy;
const User = require("../models/user");
const logger = require("../logger/index_logger");
require("dotenv").config();

function passportFunction(passport) {
  passport.serializeUser(function (user, done) {
    //создать userData  в формате базы данных name,email, age
    //  у меня сейчас user.userDate= "xdepi36", user.name= {familyName:'Денис', givenName:'Пискаев'}, user.birthday:' '.
    done(null, {
      id: user.id,
      name: user.displayName,
      email: user.emails[0].value,
      age: user.birthday ? date.now() - user.birthday : 20,
    });
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
    return obj;
  });
  const accessToken = process.env.ACCESS_TOKEN;
  passport.use(
    new YandexStrategy(
      {
        clientID: process.env.YANDEX_CLIENT_ID,
        clientSecret: process.env.YANDEX_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/yandex/callback",
      },
      function (accessToken, refreshToken, profile, done) {
          logger.warn(
            "Получили профиль клиента от Yandex " +
              profile.name.givenName +
              "  " +
              profile.name.familyName
          );
          return done(null, profile);
    
      }
    )
  );
}

module.exports = passportFunction;
