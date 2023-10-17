const express = require("express");

const { userController } = require("../controllers");
const { asyncWrap } = require("../utils/errorHandler");
const { validateToken } = require("../utils/validateToken");

const userRouter = express.Router();

userRouter.put("/", validateToken, asyncWrap(userController.updateUser));

module.exports = userRouter;
