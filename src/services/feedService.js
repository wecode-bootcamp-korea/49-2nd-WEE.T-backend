const { feedDao } = require("../models");

const getFeedService = async(userId, page, feedId) => {
    if (page < 1) throwError(400, "PAGE_STARTS_FROM_ONE");
    const getFeedList= await feedDao.getFeeds(userId, page);

    const findFeed = await feedDao.findFeedId(feedId)
    if(!findFeed) throwError(404, "FEED_NOT_FOUND");

    return { getFeedList };
};

const addFeedService = async(userId, content, challenge, imageUrl) => {
    const addFeed = await feedDao.addFeeds(userId, content, challenge, imageUrl);

    return { addFeed };
};

const deleteFeedService = async(feedId, userId) => {
    const deleteFeed = await feedDao.deleteFeeds(feedId, userId);

    return { deleteFeed };
}

const updateFeedService = async(userId, feedId, newContent, newImage) => {
    const updateFeed = await feedDao.updateFeeds(userId, feedId, newContent, newImage);

    return { updateFeed };
}

const feedRankingService = async() => {
    const feedRanking = await feedDao.feedRanking();

    return { feedRanking };
}

module.exports = {
    getFeedService,
    addFeedService,
    deleteFeedService,
    updateFeedService,
    feedRankingService,
}