const express = require("express");

const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const subscribeRouter = require("./subscribeRouter");
const feedRouter = require("./feedRouter");
const trainingRouter = require("./trainingRouter");
const statisticsRouter = require("./statisticsRouter");
const dietRouter = require("./dietRouter");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/subscribe", subscribeRouter);
router.use("/feeds", feedRouter);
router.use("/training", trainingRouter);
router.use("/statistics", statisticsRouter);
router.use("/diets", dietRouter);

module.exports = router;