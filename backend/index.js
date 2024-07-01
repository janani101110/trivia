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
const questionRoute= require("./routes/questions");
const verifyToken = require('./middleware/verifyToken');
const cookieSession = require("cookie-session")
const resopostRoutes = require("./routes/resoposts");
const resocommentRoutes = require("./routes/resocomments");
const Shoppost = require('./models/Shoppost');
const shoppostRoute= require("./routes/shoppost");
const answerRoutes = require("./routes/answer");
const bookMarkRoutes = require ('./routes/BookMarks')
const projectpostRoute = require("./routes/projectposts");

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

app.use("/",require("./routes/shoppost"));

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
app.use("/api/questions",questionRoute);
app.use("/api/answer", answerRoutes);
app.use("/api/shoppost",shoppostRoute); 
app.use("/api/projectposts", projectpostRoute);

Shoppost.init().then(() => {
  console.log('Indexes are ensured to be created.');
}).catch((err) => {
  console.error('Error ensuring indexes:', err);
});

app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.q; // Get search query from request

    // Search in ResoPost collection
    const resoResults = await ResoPost.aggregate([
      {
        $search: {
          index: "SearchReso", 
          text: {
            query: query,
            path: {
              wildcard: "*", 
            },
          },
        },
      },
    ]);

    // Search in blog
    const blogResults = await Post.aggregate([
      {
        $search: {
          index: "searchblog", 
          text: {
            query: query,
            path: {
              wildcard: "*", 
            },
          },
        },
      },
    ]);

    // Search in blog
    const projectResults = await Post.aggregate([
      {
        $search: {
          index: "SearchProject", 
          text: {
            query: query,
            path: {
              wildcard: "*", 
            },
          },
        },
      },
    ]);


    // Combine results from both collections
    const combinedResults = [...resoResults, ...blogResults, ...projectResults];

    res.json(combinedResults); // Send combined search results as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" }); 
  }
});

//graph
const AdStatSchema = new mongoose.Schema({
  date: { type: String, required: true },
  remainingCount: { type: Number, required: true },
  //deletedCount: { type: Number, required: true }
});

const AdStat = mongoose.model('AdStat', AdStatSchema);

app.get('/ad-stats', async (req, res) => {
  try {
    const adStats = await AdStat.find().sort({ date: -1 }).limit(30); // Fetch latest 30 records, adjust as needed
    res.json(adStats);
  } catch (error) {
    console.error("Error fetching ad stats:", error);
    res.status(500).send('Server Error');
  }
});

app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000');
});