const express = require("express");
const { validateToken } = require("../utils/validateToken");
const { asyncWrap } = require("../utils/errorHandler");
const { subscribeController } = require("../controllers");
const subscribeRouter = express.Router();

subscribeRouter.get("/", validateToken, asyncWrap(subscribeController.getSubscriptionPlans));
subscribeRouter.get("/checkout", validateToken, asyncWrap(subscribeController.createOrder));

module.exports = subscribeRouter;
