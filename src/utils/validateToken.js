const passport = require("passport");

const validateToken = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    const message = info?.expiredAt ? info.message.toUpperCase().replaceAll(" ", "_") : "UNAUTHORIZED";
    if (!user) return res.status(401).json({ message });

    req.user = user;

    next();
  })(req, res, next);
};

module.exports = {
  validateToken,
};
