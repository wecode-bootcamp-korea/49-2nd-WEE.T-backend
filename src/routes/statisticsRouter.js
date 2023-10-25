const express = require("express");

const { statisticsController } = require("../controllers");
const { asyncWrap } = require("../utils/errorHandler");

const statisticsRouter = express.Router();

statisticsRouter.get("/", asyncWrap(statisticsController.getStatistics));

module.exports = statisticsRouter;
