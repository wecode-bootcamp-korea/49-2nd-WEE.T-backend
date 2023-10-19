const { ConnectionReadyEvent } = require("typeorm");
const { commentService } = require("../services");
const { keyCheck } = require("../utils/keyCheck");

  const getCommentByUser  = async (req, res) => { 
  const user = req.headers.Authorization;
  const getComment = await commentService.getCommentByUser(user);

 // 댓글이 있는 경우
    return res.status(200).json({
    massage: 'READ_SUCCESS',
    data: getComment
    });
}

  const writeUserComment = async (req, res) => {  
  const userId = req.user.id;
  const { content, feedId } = req.body;

  keyCheck ({ content });

  const createComment = await commentService.writeUserComment(content, userId, feedId);

  // 
  return res.status(200).json({
  massage: 'CREATE_SUCCESS',
  date: createComment 
             
    });
} 
        
        
  const updateEditComment = async (req, res ) => { 
  const user = req.user.id;
  keyCheck ({user, feedId});
  

  const updateEditComment = await commentService.updateEditComment(user,feedId)
       
   
  return res.status(200).json({
  massage: "UPDATE_SUCCESS",
  date: updateEditComment
        
    });
}

 const userDeletComment = async (req, res) => {
 const user = req.user.id;
 const feedId = req.paramas.feed.id;
        
 const userDeletComment = await commentService.deletComment(user, feedId);

     
     res.status(200).json({ 
     massage: 'DELETE_SUCCESS',
     data: userDeletComment

      });   
    }

module.exports = {
    getCommentByUser,
    writeUserComment,
    updateEditComment,
    userDeletComment,
};