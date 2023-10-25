const { ConnectionReadyEvent } = require("typeorm");
const { commentService } = require("../services");
const { keyCheck } = require("../utils/keyCheck");

  const getCommentByUser  = async (req, res) => { 
  const userId = req.user.id;
  const feedId = req.query.feedId;
  const getComment = await commentService.getCommentByUser(userId, feedId);
  console.log("컨트롤러", userId, feedId)
  console.log('확인', getComment);
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
    const contentId = req.params.contentId
    const user = req.user.id;
    console.log('con', user, content, contentId);
    keyCheck ({user, contentId});
    const updateEditComment = await commentService.updateEditComment(content, contentId, user)
       
   
    res.status(200).json({
    massage: "UPDATE_SUCCESS",
    date: updateEditComment
        
  });
}

 const userDeletComment = async (req, res) => {
 const user = req.user.id;
 const feedId = req.query.feedId;
        
 const userDeletComment = await commentService.userDeletComment(feedId);
    
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