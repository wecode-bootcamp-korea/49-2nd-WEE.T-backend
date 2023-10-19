const { express } = require('express');
const { commentController } = require('../controllers');
const { validateToken } = require("../utils/validateToken");
const  commentRouter = express.Router();



module.export = commentRouter;
