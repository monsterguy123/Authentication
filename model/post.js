const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    image:{type:String},
    title:{type:String , required:true},
    content:{type:String},
    userId:{type:mongoose.Schema.Types.ObjectId , ref:'user'}
},{timestamps:true})

const Post = mongoose.model("Post",postSchema)

module.exports = Post;