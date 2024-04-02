const JwtStrategy = require("passport-jwt").Strategy;
const {User} = require("../models/db");
const logger = require("../logger/index_logger");


require("dotenv").config();

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};
const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.jwtToken,
};

function passportFunction(passport) {
  passport.use(
    new JwtStrategy(options, async function (jwt_payload, done) {
      try{
      const user = await User.findOne({ where: { email: dataForm.email } });
        if (user) {
          logger.info("Token accepted successfully");
          return done(null, user);
          
          
        } else {
          logger.info("Token not accepted");
          return done(null, false);
        }
      } catch (err) {return done(err, false);}
    })
  );
}
module.exports = passportFunction;
