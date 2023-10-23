const express = require("express");

const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const statisticsRouter = require("./statisticsRouter");
const dietRouter = require("./dietRouter");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/statistics", statisticsRouter);
router.use("/diets", dietRouter);

module.exports = router;
