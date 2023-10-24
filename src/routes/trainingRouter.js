const express = require("express");
const { asyncWrap } = require("../utils/errorHandler");
const { trainingController } = require("../controllers");
const trainingRouter = express.Router();
const { validateToken } = require("../utils/validateToken");

trainingRouter.get('', validateToken, asyncWrap(trainingController.workoutPlan));

module.exports = trainingRouter ;