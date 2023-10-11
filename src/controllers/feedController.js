const { feedService } = require("../services");
const { keyCheck } = require("../utils/keyCheck");

const getFeed = async(req, res) => {
    const userId = req.params.userId;
    const { page = 1, limit =10 } = req.query;
    const offset = (page -1) * limit
    const feedData = await feedService.getFeed(userId, limit, offset, page);

    return res.status(200).json({
        message : "READ_SUCCESS",
        data : feedData,
    });
};

const addFeed = async(req, res) => {
    const { userId, content, challenge, imageUrl } = req.body;
    // const userId = req.query;
    keyCheck ({userId, content, challenge, imageUrl});
    const addFeed = await feedService.addFeed(userId, content, challenge, imageUrl);

    res.status(201).json({
        message : "INSERT_SUCCESS",
        data : addFeed,
    });
};
 
const deleteFeed = async(req, res) => {
    // const { userId, feedId } = req.query;
    const feedId = req.params.feedId;
    // const userId = req.query.userId;

    const deleteFeed = await feedService.deleteFeed(feedId);

    res.status(200).json({
        message : "DELETE_SUCCESS",
        data : deleteFeed,
    });
};

const updateFeed = async(req, res) => {
    const userId = req.params.userId;
    const feedId = req.params.feedId;
    const imageId = req.params.imageId;
    const { newContent, newImage } = req.body;
    keyCheck ({userId, feedId, newContent, newImage});

    const updateFeed = await feedService.updateFeed(userId, feedId, imageId, newContent, newImage);

    return res.status(200).json({
        message : "UPDATE_SUCCESS",
        data : updateFeed,
    });
};

const feedRankingByFeedCount = async(req, res) => {
    const feedRanking = await feedService.feedRankingService();

    return res.status(200).json({
        message : "RANKLIST_SUCCESS",
        data : feedRanking,
    });
};



module.exports = {
    getFeed,
    addFeed,
    deleteFeed,
    updateFeed,
    feedRankingByFeedCount,
}