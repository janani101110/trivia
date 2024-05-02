
const express =require('express')
const mongoose  = require('mongoose')
const app=express()
const cors = require('cors');
const dotenv = require('dotenv')
const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser');
const multer=require("multer");
const projectpostRoute = require("./routes/projectposts");
//require('dotenv').config();
//const cookieParser = require('cookie-parser')


app.use(bodyParser.json());

//database connection

//use mongoose.connect to connect the mongodb database
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
dotenv.config();
app.use(express.json());
//app.use(cookieParser());

//allow rquests from 3000 
app.use(cors({
    origin: 'http://localhost:3000',
    methods: "GET, POST, PUT, DELETE",
    credentials: true
  }));
app.use("/api/projectposts", projectpostRoute);

  // Set up passport strategies (e.g., GoogleStrategy) using passportSetup

// Placeholder for Google OAuth route handling

// Placeholder for handling Google OAuth callback
//app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
 //  res.redirect('/'); // Redirect to home page after successful authentication
 //});



 

//app.use("/api/auth", authRoute);
//app.use("/api/users", userRoute);
//app.use("/api/posts", postRoutes);

//app.use("/api/comments", commentRoute);

// image storage engine
const storage = multer.diskStorage({
  
  //Project
  destination: (req, file, fn) => {
    fn(null, "images")
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
  },

});
const upload = multer({storage:storage})
//creating upload end point for images
/*app.use('/images',express.static('upload/images'))*/

//project from here 3 lines
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image has been uploaded successfully!");
});

app.listen(5000, () => {
    connectDB(); 
    console.log('Server is running on port 5000');
});