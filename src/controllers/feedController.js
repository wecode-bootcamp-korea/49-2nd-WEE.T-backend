const { feedService } = require("../services");
const { keyCheck } = require("../utils/keyCheck");

const getFeedController = async(req, res) => {
    const userId = req.params.userId;
    const { page = 1 } = req.query;
    const limit = 10
    const offset = (page -1) * limit
    console.log(page, offset);
    const getFeed = await feedService.getFeedService(userId, limit, offset, page);

    return res.status(200).json({
        message : "READ_SUCCESS",
        data : getFeed,
    });
};

const addFeedController = async(req, res) => {
    const { userId, content, challenge, imageUrl } = req.body;
    // const userId = req.query;
    keyCheck ({userId, content, challenge, imageUrl});
    const addFeed = await feedService.addFeedService(userId, content, challenge, imageUrl);

    res.status(200).json({
        message : "INSERT_SUCCESS",
        data : addFeed,
    });
};
 
const deleteFeedController = async(req, res) => {
    // const { userId, feedId } = req.query;
    const feedId = req.params.feedId;
    const userId = req.query.userId;
    const challenge = req.params.challenge;

    keyCheck ({feedId, userId, challenge});

    const deleteFeed = await feedService.deleteFeedService(feedId, userId, challenge);

    res.status(200).json({
        message : "DELETE_SUCCESS",
        data : deleteFeed,
    });
};

const updateFeedController = async(req, res) => {
    const userId = req.params.userId;
    const feedId = req.params.feedId;
    const imageId = req.params.imageId;
    const { newContent, newImage } = req.body;
    console.log(userId, feedId, newContent, newImage);
    keyCheck ({userId, feedId, newContent, newImage});

    const updateFeed = await feedService.updateFeedService(userId, feedId, imageId, newContent, newImage);

    return res.status(200).json({
        message : "UPDATE_SUCCESS",
        data : updateFeed,
    });
};

const feedRankingController = async(req, res) => {
    const feedRanking = await feedService.feedRankingService();

    return res.status(200).json({
        message : "RANKLIST_SUCCESS",
        data : feedRanking,
    });
};



module.exports = {
    getFeedController,
    addFeedController,
    deleteFeedController,
    updateFeedController,
    feedRankingController,
}