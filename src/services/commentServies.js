const { commentDao } = require("../models")
const { AppDataSource } = require("../models/dataSource")
const { throwError } = require("../utils/throwError");


const getUserByComment = async (feedId) => {
    try {
      const getComment = await commentDao.getComment(feedId, userId);
      const { feedId } = req.body;
      if (!getComment) {
           throwError(400,'COMMENT_NOT_FOUND' );
      }
      } catch (error) {
           console.log(err)
           res.status(400).json({ 
               message: 'READ_ERROR' });     
}     
} 

const writeUserComment = async (req, res) => {
        const { feedId, content } = req.body;
        const createComment = await commentServies.writeUserComment(feedId, content) ;
         
        if (!createComment) {
            throwError(400, 'FEED_NOT_FOUND');
          }
    
          if (!content || content.length < 1 || content.length >= 30) {
            throwError(400, 'COMMENT_ERROR');
          }
}        

const updateEditComment = async (feedId, userId ) => {
    const { feedId, userId } = req.body;
    const editComment = await commentServies.updateEditComment(feedId, userId);

    if (!editComment) {
            throwError(400, 'COMMENT_NOT_FOUND');
        };
}    

const userDeletComment = async (user) => {
    const user = req.user.id
    const deletComment = await commentServies.deletComment(user);
     if (deletComment === 0) {   //댓글을 찾지 못한 경우
        returnres.status(404).json({ 
        message: 'COMMENT_NOT_FOUND'
     });
    }     
}

module.exports = {
  getUserByComment,
  writeUserComment,
  updateEditComment,
  userDeletComment
}