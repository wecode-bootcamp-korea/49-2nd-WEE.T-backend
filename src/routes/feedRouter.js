const express = require("express");
const { asyncWrap } = require("../utils/errorHandler");
const { feedController } = require("../controllers");
const feedRouter = express.Router();
const { validateToken } = require("../utils/validateToken");
const { imageUploader } = require("../utils/imageUploader");

feedRouter.get('', validateToken, asyncWrap(feedController.getFeed));
feedRouter.post('', validateToken, imageUploader.array('imageUrl'), asyncWrap(feedController.addFeed));
feedRouter.delete('/:feedId', validateToken, asyncWrap(feedController.deleteFeed));
feedRouter.put('/:feedId', validateToken, imageUploader.array('imageUrl'), asyncWrap(feedController.updateFeed));
feedRouter.get('/rank', asyncWrap(feedController.feedRankingByFeedCount));
feedRouter.get('/:feedId', asyncWrap(feedController.getByFeedId));

module.exports = feedRouter;