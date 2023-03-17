const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const UserService = require("../services/user.service");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const JWTStrategy = new Strategy(jwtOptions, async (payload, done) => {
  try {
    const user = await UserService.getUser(payload.id);
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});

passport.use(JWTStrategy);

const authMiddleware = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = { authMiddleware };
