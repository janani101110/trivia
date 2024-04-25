const express =require('express');
const mongoose  = require('mongoose')
const app=express()
const cors = require('cors');
const dotenv = require('dotenv')
const cookieParser=require('cookie-parser')



//database 
 const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://jananilasindu:Trivia2024@cluster0.bic47ow.mongodb.net/")
        console.log("database connected ")
    }
    catch(err){
        console.log(err)
    }
}
//middlewares
dotenv.config()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true
  }));
app.use(cookieParser())


app.use("/",require("./routes/shoppost"));



app.listen(5000,()=>{
    connectDB()
    console.log("app is running on port 5000")
})