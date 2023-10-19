const express = require("express");

const { commentController } = require('../controllers');
const { asyncWrap } = require("../utils/errorHandler");
const { validateToken } = require("../utils/validateToken");

const commentRouter = express.Router();

commentRouter.get('', asyncWrap(commentController.getCommentByUser));
commentRouter.post('',validateToken, asyncWrap(commentController.writeUserComment));
commentRouter.put('/:feedId',validateToken, asyncWrap(commentController.updateEditComment));
commentRouter.delete('/:feedId',validateToken, asyncWrap(commentController.userDeletComment));

module.exports = commentRouter ;
