const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment:{type:String , required:true},
    userId:{type:mongoose.Schema.Types.ObjectId , ref:'user'},
    postId:{type:mongoose.Schema.Types.ObjectId , ref:'Post'}
},{timestamps:true})

const Comment = mongoose.model("Comment",commentSchema)

module.exports = Comment;