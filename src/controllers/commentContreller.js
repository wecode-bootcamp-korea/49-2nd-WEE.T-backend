const { ConnectionReadyEvent } = require("typeorm");
const { commentContreller } = require("../services");
const { throwError } = require("../utils/throwError");


const getUserByComment = async (req, res) => {

        const getComment = await commentServies.getUserComment(feedId);

        // 댓글이 있는 경우
        return res.status(200).json({
            message: 'READ_SUCCESS',
            data: getComment
            
        });
    }

const writeUserComment = async (req, res) => {
        const { feedId, content } = req.body;
        const createComment = await commentServies.writeUserComment(feedId, content)   
            
            res.status(200).json({
             message: 'CREATE_SUCCESS', 
             data: createComment
            });
         } 
        
        
const updateEditComment = async ( content ) => {
       const { content } = req.body;
       const editComment = await commentServies.updateEditComment(content)
    
        return res.status(200).json({
        massage: "UPDATE_SUCCESS",
        data: editComment
    });
}

const userDeletComment = async (req, res) => {
    const user = req.user.id
    const deletComment = await commentServies.deletComment(user);
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