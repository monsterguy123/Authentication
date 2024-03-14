const router = require('express').Router()
const AuthMiddleware = require('../Middlewares/Authmiddleware')
const {CreateCommentController, GetCommentController, DeleteCommentController} = require('../Controllers/commentController')

router.use('*',AuthMiddleware)


router.post('/createComment',CreateCommentController);
router.get('/:postId/getallcomment',GetCommentController);
router.delete('/deleteComment/:postId/:commentId',DeleteCommentController);

module.exports = router