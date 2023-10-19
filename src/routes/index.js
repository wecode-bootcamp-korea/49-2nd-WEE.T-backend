const express = require("express");

const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const statisticsRouter = require("./statisticsRouter");
const dietRouter = require("./dietRouter");
const commentRouter = require("./commentRouter");


const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/statistics", statisticsRouter);
router.use("/diets", dietRouter);
router.use("/comments", commentRouter);

module.exports = router;
