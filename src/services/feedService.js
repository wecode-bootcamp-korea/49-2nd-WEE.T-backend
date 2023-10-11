const { feedDao } = require("../models");
const { AppDataSource } = require("../models/dataSource");
const { findUserById } = require("../models/userDao");
const { throwError } = require("../utils/throwError");

const getFeedService = async(userId, limit, offset, page) => {
    if (page < 1) throwError(400, "PAGE_STARTS_FROM_ONE");
    
    const getFeedList= await feedDao.getFeeds(userId, limit, offset);
    const feedCount = await feedDao.getFeedCount();

    const feeds = Array.isArray(getFeedList) ? getFeedList : [getFeedList] ;

    return { feeds, feedCount };
};

const addFeedService = async(userId, content, challenge, imageUrl) => {
    if (imageUrl.length === 0 || imageUrl.length > 4) {
        throw new Error("이미지는 1개에서 3개 사이어야 합니다.")
    }
    const addFeed = await feedDao.addFeeds(userId, content, challenge, imageUrl)    ;
    return { addFeed };
};

const deleteFeedService = async(feedId, userId, challenge) => {
    const findFeedById = await feedDao.getByFeedId(userId);
    if (challenge != 0) {
        throwError(400, "CHALLENG_CANNOT_DELETE")
    }
    if(userId !== findFeedById[0].user_id) {
        throwError (400, "FEED_CONNECTION_ERROR");
    }
    await feedDao.deleteFeeds(feedId, userId, challenge);
}

const updateFeedService = async(userId, feedId, imageId, newContent, newImage) => {
    const findFeedById = await feedDao.getByFeedId(userId);
    console.log("userId :", userId)
    console.log("findFeedById[0].user_id : ", findFeedById[0].user_id)
    if (userId !== findFeedById[0].user_id) {
        throwError (400, "FEED_CONNECTION_ERROR");
    }
    
    if (newContent) {
        await feedDao.updateFeeds(feedId, newContent);
    }
    if (newImage) {
        await feedDao.updateImages(newImage, feedId);
    }
    if (imageId) {    
        console.log(imageId)
        if (deleteFeedImages.length === 1){
            throwError (400, "IMG_DELETE_ERROR");
        }
        await feedDao.deleteFeedImages(feedId, imageId);
    } 
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