const { commentDao } = require("../models")
const { AppDataSource } = require("../models/AppDataSource")



const getUserByComment = async (feedId) => {
      const getComment = await commentDao.getComment(feedId, userId, content);
      const { feedId } = req.body;
      if (!feedId) {
           throwError(400,'COMMENT_NOT_FOUND' );

           console.log(err)
           res.status(400).json({ 
               message: 'READ_ERROR' });     
}     
} 

const writeUserComment = async (req, res) => {
        const { feedId, content } = req.body;
        const createComment = await commentServies.writeUserComment(feedId, content)  
        if (!feedId) {
            throwError(400, 'FEED_NOT_FOUND');
          }
    
          if (!content || content.length < 1 || content.length >= 30) {
            throwError(400, 'COMMENT_ERROR');
          }
}        

const updateEditComment = async ( newContent, content ) => {
    const { content } = req.body;
    const editComment = await commentServies.updateEditComment(content)

    if (!updateEditComment) {
        return res.status(400).json({
            massage: "COMMENT_NOT_FOUND"
        });
}    
}
const userDeletComment = async (user) => {
    const user = req.user.id
    const deletComment = await commentServies.deletComment(user);
   if (err) {
    res.status(500).json({ 
        message: 'Error deleting comment'
     });
} else if (result.deletedCount === 0) {   //댓글을 찾지 못한 경우
    res.status(404).json({ 
        message: 'COMMENT_NOT_FOUND'
     });
    }     
}