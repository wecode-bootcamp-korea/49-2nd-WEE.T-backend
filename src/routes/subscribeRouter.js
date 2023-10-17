const express = require("express");
const { validateToken } = require("../middlewares/validateToken");
const { subscribeController } = require("../controllers");
const subscribeRouter = express.Router();

subscribeRouter.get(
  "/",
  validateToken,
  subscribeController.showSubscriptionPlans
);

module.exports = subscribeRouter;
