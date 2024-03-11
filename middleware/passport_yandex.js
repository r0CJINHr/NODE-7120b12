const YandexStrategy = require("passport-yandex").Strategy;
// const User = require("../models/user");
const logger = require("../logger/index_logger");
require("dotenv").config();

function passportFunction(passport) {
  passport.serializeUser(function (user, done) {
    //создать user в формате базы данных name,email,age
    const newUser = {};
    newUser.id = user.id;
    newUser.email = user.emails[0].value;
    newUser.name = user.displayName;
    newUser.age = user.birthday ? date.now() - user.birthday : 0;
    done(null, newUser);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  passport.use(
    new YandexStrategy(
      {
        clientID: process.env.YANDEX_CLIENT_ID,
        clientSecret: process.env.YANDEX_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/yandex/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        // To keep the example simple, the user's Yandex profile is returned
        // to represent the logged-in user.  In a typical application, you would
        // want to associate the Yandex account with a user record in your
        // database, and return that user instead.
        logger.info(
          "Получили профиль от Yandex " +
            profile.name.familyName +
            profile.name.givenName
        );
        return done(null, profile);
      }
    )
  );
}
module.exports = passportFunction;
