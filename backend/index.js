const express = require('express');
const router = express.Router();
const session = require('express-session')
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bodyParser=require('body-parser');
const cors = require('cors');
const path = require("path");
const passport = require('passport');
const passportSetup = require('./passport');
const cookieParser = require('cookie-parser')
const authRoute=require('./routes/auth');
const userRoute=require('./routes/users');
const blogPostRoutes=require('./routes/blogPosts');
const blogCommentRoutes=require('./routes/blogComments');
const verifyToken = require('./middleware/verifyToken');
const cookieSession = require("cookie-session")
const resopostRoutes = require("./routes/resoposts");
const resocommentRoutes = require("./routes/resocomments");
const bookMarkRoutes = require ('./routes/BookMarks')

require('dotenv').config();
require('./passport'); 

const app = express();

app.use(bodyParser.json());


//database connection
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.db);
        console.log('Database connected successfully');
    }catch(err){
        console.log(err.message);
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


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: "GET, POST, PUT, DELETE",
    credentials: true
  }));

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
app.use("/api/resoposts", resopostRoutes); // Route for resource posts
app.use("/api/resocomments", resocommentRoutes); // Route for resource post comments
app.use("/api/bookMarks", bookMarkRoutes);

// Search endpoint
app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.q; // Get search query from request
    const results = await ResoPost.aggregate([
      // Search ResoPost collection in MongoDB
      {
        $search: {
          index: "SearchReso", // Assuming 'SearchReso' is the name of the search index
          text: {
            query: query,
            path: {
              wildcard: "*", // Search all fields
            },
          },
        },
      },
    ]);
    res.json(results); // Send search results as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" }); // Send error response if something goes wrong
  }
});



app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000');
});