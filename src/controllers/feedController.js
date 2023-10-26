const { feedService } = require("../services");
const { keyCheck } = require("../utils/keyCheck");

const getFeed = async(req, res) => {
    const user = req.user ? req.user.id : 0;
    const { page = 1 } = req.query;
    const limit = 10;
    const feedData = await feedService.getFeed(user, limit, page);

    return res.status(200).json({
        message : "READ_SUCCESS",
        data : feedData,
    });
};

const addFeed = async(req, res) => {
    const imageUrls = []
    for (let i = 0; i < req.files.length; i++) {
        imageUrls.push(req.files[i].location);
    }
    const { content, challenge } = req.body;
    const user = req.user.id;
    keyCheck ({content, challenge});
    const addFeed = await feedService.addFeed(user, content, challenge, imageUrls);

    res.status(200).json({
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

const getByFeedId = async(req, res) => {
    const user = req.user.id;
    const feedId = req.params.feedId;
    console.log(user, feedId);
    keyCheck ({user, feedId});

    const getByFeedId = await feedService.getFeedById(feedId, user);

    return res.status(200).json({
        message : "READ_SUCCESS",
        data : getByFeedId,
    })
}

const updateFeed = async(req, res) => {
    const user = req.user.id;
    const feedId = req.params.feedId;
    const { newContent, imageId } = req.body;
    const imageUrls = []
    for (let i = 0; i < req.files.length; i++) {
        imageUrls.push(req.files[i].location);
    }
    keyCheck ({feedId});

    const updateFeed = await feedService.updateFeed(user, newContent, imageUrls, feedId, imageId);

    return res.status(200).json({
        message : "UPDATE_SUCCESS",
        data : updateFeed,
    });
};

const feedRankingByFeedCount = async(req, res) => {
    const feedRanking = await feedService.feedRankingByFeedCount();

    return res.status(200).json({
        message : "RANKLIST_SUCCESS",
        data : feedRanking,
    });
};



module.exports = {
    getFeed,
    addFeed,
    getByFeedId,
    deleteFeed,
    updateFeed,
    feedRankingByFeedCount,
}