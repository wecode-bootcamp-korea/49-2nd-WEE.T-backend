const { ConnectionReadyEvent } = require("typeorm");
const { commentService } = require("../services");
const { keyCheck } = require("../utils/keyCheck");

  const getCommentByUser  = async (req, res) => { 
  const userId = req.user.id;
  const feedId = req.query.feedId;
  const getComment = await commentService.getCommentByUser(userId, feedId);
 // 댓글이 있는 경우
    res.status(200).json({
    massage: 'READ_SUCCESS',
    data: getComment,
    });
}

  const writeUserComment = async (req, res) => {  
  const userId = req.user.id;
  const { content, feedId } = req.body;
  console.log("확인", userId , feedId);
  keyCheck ({ content });

  const createComment = await commentService.writeUserComment(content, userId, feedId);

  // 
  res.status(200).json({
  massage: 'CREATE_SUCCESS'          
    });
} 
        
        
  const updateEditComment = async (req, res ) => {
    const {content} = req.body;
    const commentId = req.query.commentId
    const user = req.user.id;
    keyCheck ({user, commentId});
    const updateEditComment = await commentService.updateEditComment(content, commentId, user)
       
   
    res.status(200).json({
    massage: "UPDATE_SUCCESS",
    date: updateEditComment
        
  });
}

 const userDeletComment = async (req, res) => {
 const user = req.user.id;
 const commentId = req.query.commentId;
        
 const userDeletComment = await commentService.userDeletComment(commentId);
    
  res.status(200).json({ 
  massage: 'DELETE_SUCCESS',


    });   
  }

module.exports = {
    getCommentByUser,
    writeUserComment,
    updateEditComment,
    userDeletComment,
};