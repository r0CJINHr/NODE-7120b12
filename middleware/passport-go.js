const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user");
const logger = require("../logger/index_logger");
require("dotenv").config();

function passportFunctionGoogle(passport) {
  passport.serializeUser(function (user, done) {
    //создать userData  в формате базы данных name,email, age
    //  у меня сейчас user.userDate= "xdepi36", user.name= {familyName:'Денис', givenName:'Пискаев'}, user.birthday:' '.
    // done(null,user);
    done(null, {
      id: user.id,
      name: user.displayName,
      //   email: user.emails[0].value,
      //   age: user.birthday ? date.now() - user.birthday : 20,
    });
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
    return obj;
  });
  //   const accessToken = process.env.ACCESS_TOKEN_GOOGLE;
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true,
      },
      function (request, accessToken, refreshToken, profile, done) {
        logger.warn(
          "Получили профиль клиента от Google " +
            profile.name.givenName +
            "  " +
            profile.name.familyName
        );
        return done(null, profile);
      }
    )
  );
}

module.exports = passportFunctionGoogle;
