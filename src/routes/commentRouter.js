const express = require("express");

const { commentController } = require('../controllers');
const { asyncWrap } = require("../utils/errorHandler");
const { validateToken } = require("../utils/validateToken");

const commentRouter = express.Router();

commentRouter.get('', validateToken, asyncWrap(commentController.getCommentByUser));
commentRouter.post('',validateToken, asyncWrap(commentController.writeUserComment));
commentRouter.put('/:contentId',validateToken, asyncWrap(commentController.updateEditComment));
commentRouter.delete('',validateToken, asyncWrap(commentController.userDeletComment));

module.exports = commentRouter ;
