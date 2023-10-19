const { ConnectionReadyEvent } = require("typeorm");
const { commentContreller } = require("../services");
const { keyCheck } = require("../utils/keyCheck");


const getUserByComment = async (req, res) => {
        const user = req.headers.Authorization;
        const getComment = await commentServies.getUserComment(user);

        // 댓글이 있는 경우
        if(!getComment)
        return res.status(200).json({
            message: 'READ_SUCCESS',
            
            
        });
    }

const writeUserComment = async (req, res) => {
        const user = req.user.id;
        const feedId = req.paramas.feedId;

        keyCheck ({feedId, userId});

        const createComment = await commentServies.writeUserComment(feedId, user);

        if(!createComment)
        return res.status(200).json({
             message: 'CREATE_SUCCESS', 
             
            });
         } 
        
        
const updateEditComment = async (req, res ) => {
       const user = req.user.id;
       keyCheck ({userId, feedId});

       const updateEditComment = await commentServies.updateEditComment(user,feedId)
       
       if(!updateEditComment)
       return res.status(200).json({
        massage: "UPDATE_SUCCESS",
        
    });
}

const userDeletComment = async (req, res) => {
    const user = req.user.id;
    
    const userDeletComment = await commentServies.deletComment(user, feedId);

    if(!userDeletComment)
            res.status(200).json({ 
                message: 'DELETE_SUCCESS'
             });   
}






module.exports = {
    getUserByComment,
    writeUserComment,
    updateEditComment,
    userDeletComment


};