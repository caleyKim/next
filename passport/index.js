const passport    = require('passport');
const passportJWT = require("passport-jwt");
const bcrypt = require('bcrypt');
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;
const { User } = require('../models');

require('dotenv').config();

passport.use(new LocalStrategy({
  usernameField: 'user_id',
  passwordField: 'password'
},async (user_id, password, done) => {
  try {
    const exUser = await User.find({ where: { user_id } });
    if (exUser) {
      const result = await bcrypt.compare(password, exUser.password);
      if (result) {
        done(null, exUser);
      } else {
        done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
      }
    } else {
      done(null, false, { message: '가입되지 않은 회원입니다.' });
    }
  } catch (error) {
    console.error(error);
    done(error);
  }
}
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : process.env.JWT_SECRET
},
function (jwtPayload, cb) {

  //find the user in db if needed
  return User.findOneById(jwtPayload.id)
    .then(user => {
      return cb(null, user);
    })
    .catch(err => {
      return cb(err);
    });
  }
));