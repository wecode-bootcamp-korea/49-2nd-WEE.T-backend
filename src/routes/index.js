const express = require("express");

const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const feedRouter = require("./feedRouter");
const trainingRouter = require("./trainingRouter");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/feeds", feedRouter);
router.use("/training", trainingRouter);

module.exports = router;