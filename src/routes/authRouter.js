const express = require("express");
const passport = require("passport");

const { authController } = require("../controllers");

const authRouter = express.Router();

authRouter.get("/kakao/login", passport.authenticate("kakao", { session: false }), authController.socialLogin);

module.exports = authRouter;
