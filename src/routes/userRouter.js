const express = require("express");

const { userController } = require("../controllers");
const { asyncWrap } = require("../utils/errorHandler");
const { validateToken } = require("../utils/validateToken");

const userRouter = express.Router();

userRouter.put("/", validateToken, asyncWrap(userController.updateUser));
userRouter.post("/nickname", validateToken, asyncWrap(userController.checkDuplicatedNickname));
userRouter.get("/", validateToken, asyncWrap(userController.getUserInfo));

module.exports = userRouter;
