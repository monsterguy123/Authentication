const router = require('express').Router();
const AuthMiddleware = require('../Middlewares/Authmiddleware')
const {CreatePostController,getPostController, UpdatePostcontroller, DeletePostController, LikeController, UnlikeController, getLikeController} = require('../Controllers/postController')

//Auth Middleware
router.use('*',AuthMiddleware);

//Post Route
router.post('/createPost',CreatePostController);
router.get('/getallpost',getPostController)
router.put('/Updatepost/:postid',UpdatePostcontroller)
router.delete('/deletepost/:postid',DeletePostController)

//Like Post Route
router.post('/:postId/like',LikeController)
router.delete('/:postId/unlike',UnlikeController)
router.get('/:postId/getalllikes',getLikeController)

module.exports = router