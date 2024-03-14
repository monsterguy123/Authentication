const Comment = require('../model/comments')
const zod = require('zod')


//Create a comment
const commentSchema = zod.object({
    comment:zod.string(),
    postId:zod.string()
})

const CreateCommentController = async(req,res)=>{
    try {
        const parse = commentSchema.safeParse(req.body);
        if(parse.success === false){
            res.json({msg:"something wrong with the request body"})
        }

        const userId = req.userId;
        await Comment.create({
           ...req.body,
           userId  
        })
        res.json({msg:"comment posted successfully..."});
    } catch (error) {
        res.json({msg:error.message});
    }
}

//Delete a comment
const DeleteCommentController = async(req,res)=>{
    try {
       const userId = req.userId;
       const id = req.params.commentId;
       const postId = req.params.postId;
       await Comment.deleteOne({_id:id , userId , postId})
       res.json({msg:"comment deleted successfully!!!"})
    } catch (error) {
       res.json({msg:error.message})
    }
}

//get all comment of a post
const getCommentController = async(req,res)=>{
    try {
        const postId = req.params.postId;
        const Comments = await Comment.find({postId});
        
        res.json({Comments})
    } catch (error) {
        res.json({msg:error.message})
    }
}

module.exports = {CreateCommentController,DeleteCommentController,getCommentController}