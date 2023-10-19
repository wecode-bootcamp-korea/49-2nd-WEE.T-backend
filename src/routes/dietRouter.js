const express = require("express");

const { dietController } = require("../controllers");
const { asyncWrap } = require("../utils/errorHandler");
const { validateToken } = require("../utils/validateToken");

const dietRouter = express.Router();

dietRouter.get("/", validateToken, asyncWrap(dietController.getDietInfo));

module.exports = dietRouter;
