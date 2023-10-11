const express = require("express");
const passport = require("passport");

const userRouter = express.Router();

const { userController } = require("../controllers");
const { asyncWrap } = require("../utils/errorHandler");

userRouter.put(
  "/",
  (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      const message = info?.expiredAt ? info.message.toUpperCase().replaceAll(" ", "_") : "UNAUTHORIZED";
      if (!user) return res.status(401).json({ message });

      req.user = user;

      next();
    })(req, res, next);
  },
  asyncWrap(userController.updateUser)
);

module.exports = userRouter;
