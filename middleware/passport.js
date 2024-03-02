const YandexStrategy = require("passport-yandex").Strategy;
const User = require("../models/user");
const logger = require("../logger/index_logger");
require("dotenv").config();

function passportFunction(passport) {
  // Passport session setup.
  //   To support persistent login sessions, Passport needs to be able to
  //   serialize users into and deserialize users out of the session.  Typically,
  //   this will be as simple as storing the user ID when serializing, and finding
  //   the user by ID when deserializing.  However, since this example does not
  //   have a database of user records, the complete Yandex profile is
  //   serialized and deserialized.
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
    logger.info(obj.name.givenName);
    return obj;
  });

  passport.use(
    new YandexStrategy(
      {
        clientID: process.env.YANDEX_CLIENT_ID,
        clientSecret: process.env.YANDEX_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/yandex/callback",
      },
      function (
        y0_AgAAAAAQTWdfAAtidwAAAAD85OsrAABuXBYMS3VBL4nSipXR08NH478NUQ,
        refreshToken,
        profile,
        done
      ) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
          // To keep the example simple, the user's Yandex profile is returned
          // to represent the logged-in user.  In a typical application, you would
          // want to associate the Yandex account with a user record in your
          // database, and return that user instead.
          logger.warn(
            "Получили профиль клиента от Yandex " +
              profile.name.givenName +
              "  " +
              profile.name.familyName
          );
          return done(null, profile);
        });
      }
    )
  );
}

module.exports = passportFunction;
