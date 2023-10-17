const express = require("express");

const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const subscribeRouter = require("./subscribeRouter");
const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/subscribe", subscribeRouter);

module.exports = router;
