const { feedDao } = require("../models");
const { AppDataSource } = require("../models/dataSource");
const { throwError } = require("../utils/throwError");

const getFeed = async(userId, limit, offset, page) => {

    const getFeedList= await feedDao.getFeeds(userId, limit, offset);
    const feedCount = await feedDao.getFeedCount();

    // const feeds = Array.isArray(getFeedList) ? getFeedList : [getFeedList] ;
    return { getFeedList, feedCount };
};

const addFeed = async(userId, content, challenge, imageUrl) => {
    if (imageUrl.length === 0 || imageUrl.length > 3) {
        throw new Error("이미지는 1개에서 3개 사이어야 합니다.")
    }
    const addFeed = await feedDao.addFeeds(userId, content, challenge, imageUrl)    ;
    return { addFeed };
};

const deleteFeed = async(feedId) => {
    const feed = await feedDao.getByFeedId(feedId);
    console.log(feedId)
    console.log(feed.is_challenge);
    if (feed.is_challenge === 1) {
        throwError (400, "CHALLENGE_ERROR");
    }
    // 토큰값 컨트롤에서 가져와서 비교
    // if(userId !== findFeedById[0].user_id) {
    //     throwError (400, "FEED_CONNECTION_ERROR");
    // }
    await feedDao.deleteFeeds(feedId);
}

const updateFeed = async(feedId, imageId, newContent, newImage) => {
    const findFeedById = await feedDao.getByFeedId(feedId);
    // if (userId !== findFeedById[0].user_id) {
    //     throwError (400, "FEED_CONNECTION_ERROR");
    // }
    
    if (newContent) {
        await feedDao.updateFeeds(feedId, newContent);
    }
    if (newImage) {
        await feedDao.updateImages(newImage, feedId);
    }
    if (imageId) {    
        if (deleteFeedImages.length === 1){
            throwError (400, "IMG_DELETE_ERROR");
        }
        await feedDao.deleteFeedImages(feedId, imageId);
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