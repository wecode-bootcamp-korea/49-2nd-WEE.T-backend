const { feedDao } = require("../models");
const { AppDataSource } = require("../models/dataSource");
const { deleteFeedImages } = require("../models/feedDao");
const { throwError } = require("../utils/throwError");

const getFeed = async(userId, limit, offset, page) => {

    
    const getFeedList= await feedDao.getFeeds(userId, limit, offset);
    const feedCount = await feedDao.getFeedCount();

    return { getFeedList, feedCount };
};

const addFeed = async(userId, content, challenge, imageUrl) => {
    if (imageUrl.length === 0 || imageUrl.length > 3) {
        throw new Error("이미지는 1개에서 3개 사이어야 합니다.")
    }
    const addFeed = await feedDao.addFeeds(userId, content, challenge, imageUrl)    ;
    return { addFeed };
};

const deleteFeed = async(userId, feedId) => {
    const feed = await feedDao.getByFeedId(feedId);
    // 토큰값 컨트롤에서 가져와서 비교
    if(userId !== feed.user_id) {
        throwError (400, "FEED_CONNECTION_ERROR");
    }
    if (feed.is_challenge === 1) {
        throwError (400, "CHALLENGE_ERROR");
    }
    await feedDao.deleteFeeds(feedId);
}

const updateFeed = async(user, newContent, newImage, feedId, imageId) => {
    const feed = await feedDao.getByFeedId(feedId);
    if (user !== feed.user_id) {
        throwError (400, "FEED_CONNECTION_ERROR");
    }
    if (newContent) {
        await feedDao.updateFeeds(feedId, newContent);
    }
    if (newImage && newImage.length > 0) {
        await feedDao.updateImages(newImage, feedId);
    }
    if (feedId && imageId) {    
        const imageCount = await feedDao.deleteFeedImages(feedId, imageId);
        if (imageCount.imgCount < 1){
            throwError (400, "IMG_DELETE_ERROR");
        }
    } 
}

const feedRankingByFeedCount = async() => {
    const feedRanking = await feedDao.feedRankingByFeedCount();

    return { feedRanking };
}

module.exports = {
    getFeed,
    addFeed,
    deleteFeed,
    updateFeed,
    feedRankingByFeedCount,
}