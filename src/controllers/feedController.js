const { feedService } = require("../services");
const { throwError } =require("../utils");

const getFeedController = async(req, res) => {
    try{
        const userId = req.query;
        const {page = 1, feedId} = req.query;

        const getFeed = await feedService.getFeedService(userId, page, feedId);

        return res.status(200).json({
            message : "READ_SUCCESS",
            data : getFeed,
        });
    } catch (err) {
        console.error(err);
        throwError(400, "READ_ERROR");
    }
};

const addFeedController = async(req, res) => {
    try{

        const { userId, content, challenge, imageUrl } = req.body;
        // const userId = req.query;

        const addFeed = await feedService.addFeedService(userId, content, challenge, imageUrl);

        res.status(200).json({
            message : "INSERT_SUCCESS",
            data : addFeed,
        });
    } catch (err) {
        console.error(err);
        throwError(400, "INSERT_ERROR");
    }
}
 
const deleteFeedController = async(req, res) => {
    try{
        const userId = req.token;
        const feedId = req.query;

        const deleteFeed = await feedService.deleteFeedService(feedId, userId);

        res.status(200).json({
            message : "DELETE_SUCCESS",
            data : deleteFeed,
        });
    } catch (err) {
        console.error(err);
        throwError(400, "DELETE_ERROR");
    }
}

const updateFeedController = async(req, res) => {
    try{
        const userId = req.token;
        const feedId = req.query;
        const { newContent, newImage } = req.body;

        const updateFeed = await feedService.updateFeedService(userId, feedId, newContent, newImage);

        return res.status(200).json({
            message : "UPDATE_SUCCESS",
            data : updateFeed,
        });
    } catch (err) {
        console.error(err);
        throwError(400, "UPDATE_ERROR");
    }
}

const feedRankingController = async(req, res) => {
    try{
        const feedRanking = await feedService.feedRankingService();

        return res.status(200).json({
            message : "RANKLIST_SUCCESS",
            data : feedRanking,
        });
    } catch (err) {
        throwError(400, "RANKING_ERROR");
    }
}

module.exports = {
    getFeedController,
    addFeedController,
    deleteFeedController,
    updateFeedController,
    feedRankingController,
}