const express = require("express");
const passport = require("passport");

const { authController } = require("../controllers");
const { asyncWrap } = require("../utils/errorHandler");
const { validateToken } = require("../utils/validateToken");

const authRouter = express.Router();

authRouter.get("/kakao/login", passport.authenticate("kakao", { session: false }), authController.socialLogin);
authRouter.get("/kakao", passport.authenticate("kakao", { session: false }));
authRouter.put("/signup", validateToken, asyncWrap(authController.signup));
authRouter.get("/logout", validateToken, asyncWrap(authController.logout));

module.exports = authRouter;
