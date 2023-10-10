const express = require("express");
const feedRouter = require("./feedRouter");
const router = express.Router();

router.use("/feeds", feedRouter)

module.exports = { router };