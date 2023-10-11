const { feedService } = require("../services");
const { keyCheck } = require("../utils/keyCheck");

const getFeed = async(req, res) => {
    const user = req.headers.Authorization;
    const { page = 1, limit =10 } = req.query;
    const offset = (page -1) * limit
    const feedData = await feedService.getFeed(limit, offset, page);

    return res.status(200).json({
        message : "READ_SUCCESS",
        data : feedData,
    });
};

const addFeed = async(req, res) => {
    const { content, challenge, imageUrl } = req.body;
    const user = req.user.id;
    keyCheck ({content, challenge, imageUrl});
    const addFeed = await feedService.addFeed(user, content, challenge, imageUrl);

    res.status(201).json({
        message : "INSERT_SUCCESS",
        data : addFeed,
    });
};
 
const deleteFeed = async(req, res) => {
    const feedId = req.params.feedId;
    const user = req.user.id;
    
    const deleteFeed = await feedService.deleteFeed(user, feedId);

    res.status(200).json({
        message : "DELETE_SUCCESS",
        data : deleteFeed,
    });
};

const updateFeed = async(req, res) => {
    const user = req.user.id;
    const feedId = req.params.feedId;
    const { newContent, newImage, imageId } = req.body;
    keyCheck ({feedId, newContent, newImage});

    const updateFeed = await feedService.updateFeed(user, newContent, newImage, feedId, imageId);

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