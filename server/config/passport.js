require('./config');

const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const user = require('../models/user.model');

module.exports = (passport) => {
    let options = {};
    options.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = process.env.JWT_SECRET;
    passport.use(new jwtStrategy(options, (jwt_payload, done) => {
        user.getUserById(jwt_payload.data._id, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}