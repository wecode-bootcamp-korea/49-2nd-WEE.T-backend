
const { commentDao } = require("../models");
const { throwError } = require("../utils/throwError");


const getCommentByUser = async ( userId, feedId) => {
  const getComment = await commentDao.getCommentByUser(userId, feedId);
  if (!getComment) throwError(400,'COMMENT_NOT_FOUND' );
  
  console.log("서비스확인", getComment);
  return getComment;
} 

const writeUserComment = async ( content, userId, feedId) => {
  // 피드를 찾는 다오 호출
    const findFeedById = commentDao.findFeedById(feedId);
  
    if (!findFeedById) {
    throwError(400, 'FEED_NOT_FOUND');
    }
    
    if (!content || content.length < 1 || content.length >= 30) {   //댓글수는 1~30자
      throwError(400, 'COMMENT_ERROR');
    }

    await commentDao.writeUserComment( content, userId, feedId ) ;
}        

const updateEditComment = async (content, contentId, userId ) => {
    const editComment = await commentDao.updateEditComment(content, contentId, userId);
    console.log('ser', userId, contentId, content);
    // if (userId !== editComment.user_id) throwError(400, "COMMENT_ERROR");
    // if (content.length > 0) throwError(400, "NOT_FOUND_CONTNET");
}    

const userDeletComment = async (feedId) => {
    const deletComment = await commentDao.userDeletComment(feedId);
     if (deletComment === 0) throwError(400, "NOT_FOUND_COMMENT");  //댓글을 찾지 못한 경우
     
    }     


module.exports = {
  getCommentByUser,
  writeUserComment,
  updateEditComment,
  userDeletComment
}