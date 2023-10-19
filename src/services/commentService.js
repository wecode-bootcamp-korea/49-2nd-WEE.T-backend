const { commentDao } = require("../models");
const { throwError } = require("../utils/throwError");


const getCommentByUser = async (nickname, userId, feedId, content, createAt, isMyComment) => {
      const getComment = commentDao.getCommentByUser(nickname, userId, feedId, content, createAt, isMyComment);
      if (!getComment) {
           throwError(400,'COMMENT_NOT_FOUND' );
      } return getComment
} 

const writeUserComment = async ( content, userId, feedId) => {
   const createComment = await commentDao.writeUserComment( content, userId, feedId ) ;

   if (!createComment) {
   throwError(400, 'FEED_NOT_FOUND');
 }
    
   if (!content || content.length < 1 || content.length >= 30) {   //댓글수는 1~30자
   throwError(400, 'COMMENT_ERROR');
 }
}        

const updateEditComment = async (feedId, userId ) => {
    const editComment = await commentDao.updateEditComment(feedId, userId);

    if (!editComment) {
            throwError(400, 'COMMENT_NOT_FOUND');
        };
}    

const userDeletComment = async (user) => {
    const deletComment = await commentDao.deletComment(user);
     if (deletComment === 0) {   //댓글을 찾지 못한 경우
        returnres.status(404).json({ 
        message: 'COMMENT_NOT_FOUND'
     });
    }     
}

module.exports = {
  getCommentByUser,
  writeUserComment,
  updateEditComment,
  userDeletComment
}