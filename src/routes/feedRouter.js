const express = require("express");
const { asyncWrap } = require("../utils/errorHandler");
const { feedController } = require("../controllers");
const feedRouter = express.Router();

feedRouter.get('', asyncWrap(feedController.getFeed));
feedRouter.post('', asyncWrap(feedController.addFeed));
feedRouter.delete('/:feedId', asyncWrap(feedController.deleteFeed));
feedRouter.put(':feedId', asyncWrap(feedController.updateFeed));
// userId token imageId body
feedRouter.get('/rank', asyncWrap(feedController.feedRankingByFeedCount));

module.exports = feedRouter;