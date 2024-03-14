const router = require('express').Router()
const AuthMiddleware = require('../Middlewares/Authmiddleware')
const {CreateCommentController, getCommentController, DeleteCommentController} = require('../Controllers/commentController')

router.use('*',AuthMiddleware)


router.post('/createComment',CreateCommentController);
router.get('/:postId/getallcomment',getCommentController);
router.delete('/deleteComment/:postId/:commentId',DeleteCommentController);

module.exports = router