const express = require("express");
const passport = require("passport");

const { authController } = require("../controllers");

const authRouter = express.Router();

authRouter.get("/kakao/login", passport.authenticate("kakao", { session: false }), authController.socialLogin);
authRouter.get("/kakao", passport.authenticate("kakao", { session: false }));

module.exports = authRouter;
