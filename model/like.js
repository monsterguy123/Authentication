const mongoose = require('mongoose')

const LikeSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId , ref:'user'},
    postId:{type:mongoose.Schema.Types.ObjectId , ref:'Post'}
},{timestamps:true})

const Like = mongoose.model("Like",LikeSchema)

module.exports = Like;