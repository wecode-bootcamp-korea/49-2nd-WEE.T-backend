const express = require("express");
const { validateToken } = require("../utils/validateToken");
const { asyncWrap } = require("../utils/errorHandler");
const { subscribeController } = require("../controllers");
const subscribeRouter = express.Router();

subscribeRouter.get(
  "/",
  validateToken,
  asyncWrap(subscribeController.showSubscriptionPlans)
);

module.exports = subscribeRouter;
