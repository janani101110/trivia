const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
    comment: {
        type:String,
        required:true,
        unique:true,
    },
    author:{
        type:String,
        required:true,
        unique:true,
    },
    postId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    })

module.exports=mongoose.model('Comment',CommentSchema)