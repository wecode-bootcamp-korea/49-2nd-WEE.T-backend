const express = require("express");
const { asyncWrap } = require("../utils/errorHandler");
const { feedController } = require("../controllers");
const feedRouter = express.Router();
const { validateToken } = require("../utils/validateToken")

feedRouter.get('', asyncWrap(feedController.getFeed));
feedRouter.post('', validateToken, asyncWrap(feedController.addFeed));
feedRouter.delete('/:feedId', validateToken, asyncWrap(feedController.deleteFeed));
feedRouter.put('/:feedId', validateToken, asyncWrap(feedController.updateFeed));
feedRouter.get('/rank', validateToken, asyncWrap(feedController.feedRankingByFeedCount));

module.exports = feedRouter;