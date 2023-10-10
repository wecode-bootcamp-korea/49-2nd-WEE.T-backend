const express = require("express");
const { asyncWrap } = require("../utils");
const { feedController } = require("../controllers");
const feedRouter = express.Router();

feedRouter.get('', asyncWrap(feedController.getFeedController));
feedRouter.post('', asyncWrap(feedController.addFeedController));


module.exports = feedRouter;