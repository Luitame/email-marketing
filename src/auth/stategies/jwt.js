let passport = require('passport');
let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;

let User = require('./../../models/user');
let cfg = require('./../../../config');

let params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

let strategy = new JwtStrategy(params, function (jwt_payload, done) {
  let id = jwt_payload.id;

  let callback = function (err, user) {
    if (err) {
      return done(err);
    }
    return done(null, user);
  };

  User.findById(id, callback);
});

passport.use(strategy);

module.exports = passport;
