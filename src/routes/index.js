const express = require("express");

const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const statisticsRouter = require("./statisticsRouter");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/statistics", statisticsRouter);

module.exports = router;
