const express = require("express");

const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const feedRouter = require("./feedRouter");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/feeds", feedRouter);

module.exports = router;