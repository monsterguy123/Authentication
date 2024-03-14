const router = require('express').Router();
const AuthMiddleware = require('../Middlewares/Authmiddleware')
const {CreatePostController,GetPostController, UpdatePostcontroller, DeletePostController, LikeController, UnlikeController, GetLikeController} = require('../Controllers/postController')

//Auth Middleware
router.use('*',AuthMiddleware);

//Post Route
router.post('/createPost',CreatePostController);
router.get('/getallpost',GetPostController)
router.put('/Updatepost/:postid',UpdatePostcontroller)
router.delete('/deletepost/:postid',DeletePostController)

//Like Post Route
router.post('/:postId/like',LikeController)
router.delete('/:postId/unlike',UnlikeController)
router.get('/:postId/getalllikes',GetLikeController)

module.exports = router