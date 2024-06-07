
const express =require('express')
const router = express.Router();
const session = require('express-session')
const mongoose  = require('mongoose')
const jwt = require("jsonwebtoken");
const bodyParser=require('body-parser');
const cors = require('cors');
const path = require("path");
const passport = require('passport')
const passportSetup = require('./passport');
const cookieParser = require('cookie-parser')
const authRoute=require('./routes/auth');
const userRoute=require('./routes/users');
const blogPostRoutes=require('./routes/blogPosts');
const blogCommentRoutes=require('./routes/blogComments')
const projectpostRoute = require("./routes/projectposts");
const verifyToken = require('./middleware/verifyToken');
const cookieSession = require("cookie-session")
const app=express()
const dotenv = require('dotenv')
const multer=require("multer");

//require('dotenv').config();
//const cookieParser = require('cookie-parser')
require('dotenv').config();
require('./passport'); 

app.use(bodyParser.json());

//database connection

//use mongoose.connect to connect the mongodb database
const connectDB=async()=>{
  try{
      await mongoose.connect("mongodb+srv://jananilasindu:Trivia2024@cluster0.bic47ow.mongodb.net/")
      //await mongoose.connect(process.env.db);
      console.log("database connected ")
  }
  catch(err){
    //console.log(err.message);
     console.log(err)
  }
}

// session
app.use(session({
  secret: process.env.accessToken_secret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

//middlewares
dotenv.config();
app.use(express.json());
app.use(cookieParser());

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


 app.get("/auth/google",
 passport.authenticate("google", { scope: ['profile'] })
);


app.get("/auth/google/callback",
 passport.authenticate("google", { failureRedirect: "/loginError" }),
 function(req, res) {
   // Successful authentication, redirect secrets.
   res.redirect("http://localhost:3000");
 }
);

app.get('/loginError', function (req, res) {

res.status(500).send('Login process encountered an error. Please try again.');
});
 
app.get('/checkAuth', verifyToken, (req, res) => {
  res.sendStatus(200);
})

app.get('/', (req, res) => {
  res.send('express app is running');
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/blogPosts", blogPostRoutes);
app.use("/api/blogComments", blogCommentRoutes);

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