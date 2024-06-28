const mongoose = require ("mongoose");
const Questions = new mongoose.Schema(
    {
        title:{
            type:String,
            required : true,

        },
        description:{
            type:String,
            required : true,   
        },
        imageUrl:{
            type:String,
            required:false,
        },
        viewCount:{
            type:Number,
            default:0
        },
        date:{
            type:String,
            required:true,
        }
    },
    {
        timestamps:true
    }
);
module.exports=mongoose.model('questions',Questions);
// const blogPost =mongoose.model('blogPost',blogPostSchema);
// const question = mongoose.model('')