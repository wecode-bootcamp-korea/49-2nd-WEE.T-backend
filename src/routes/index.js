const express = require("express");

const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const commentRouter = require("./commentRouter");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/comments", commentRouter);

module.exports = router;
