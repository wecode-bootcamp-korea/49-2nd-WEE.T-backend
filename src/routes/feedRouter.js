const express = require("express");
const { asyncWrap } = require("../utils/errorHandler");
const { feedController } = require("../controllers");
const feedRouter = express.Router();

feedRouter.get('', asyncWrap(feedController.getFeedController));
feedRouter.post('', asyncWrap(feedController.addFeedController));
feedRouter.delete('/:feedId', asyncWrap(feedController.deleteFeedController));
feedRouter.put('/:userId/:feedId/:imageId', asyncWrap(feedController.updateFeedController));
feedRouter.delete('/:userId/:feedId/:imageId', asyncWrap(feedController.updateFeedController));
feedRouter.get('/rank', asyncWrap(feedController.feedRankingController));

module.exports = feedRouter;