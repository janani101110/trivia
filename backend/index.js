const express =require('express');
const mongoose  = require('mongoose')
const app=express() 
const cors = require('cors');
const dotenv = require('dotenv')
const cookieParser=require('cookie-parser')
const router = express.Router();
const session = require('express-session')
const jwt = require("jsonwebtoken");
const bodyParser=require('body-parser');
const path = require("path");
const passport = require('passport')
const passportSetup = require('./passport');
const authRoute=require('./routes/auth');
const userRoute=require('./routes/users');
const verifyToken = require('./middleware/verifyToken');
const cookieSession = require("cookie-session")
const blogPostRoutes=require('./routes/blogPosts');
const blogCommentRoutes=require('./routes/blogComments');
const Shoppost = require('./models/Shoppost');
const questionRoute= require("./routes/questions");
const shoppostRoute= require("./routes/shoppost");
const resopostRoutes = require("./routes/resoposts");
const resocommentRoutes = require("./routes/resocomments");
const projectpostRoute = require("./routes/projectposts");
const answerRoutes = require("./routes/answer");
const bookMarkRoutes = require('./routes/BookMarks');
// const translate = require('google-translate-api');



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
require('./passport');
app.use(express.json())
app.use(cors({
      origin: 'http://localhost:3000',
      methods: "GET, POST, PUT, DELETE",
      credentials: true
    }));
app.use(cookieParser())
app.use(bodyParser.json());


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
  
   
  app.use("/api/shoppost",shoppostRoute); 
  app.use("/api/questions",questionRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/blogPosts", blogPostRoutes);
app.use("/api/blogComments", blogCommentRoutes);
app.use("/api/resoposts", resopostRoutes); // Route for resource posts
app.use("/api/resocomments", resocommentRoutes);
app.use("/api/projectposts", projectpostRoute);
app.use("/api/answer", answerRoutes);
app.use("/api/bookMarks", bookMarkRoutes);


Shoppost.init().then(() => {
  console.log('Indexes are ensured to be created.');
}).catch((err) => {
  console.error('Error ensuring indexes:', err);
});
// const dropAndCreateIndex = async () => {
//   try {
//     await Shoppost.collection.dropIndex('createdAt_1'); // Assuming 'createdAt_1' is the name of the index
//     console.log('Old index dropped successfully');
    
//     // Ensure new index is created with correct TTL
//     await Shoppost.init();
//     console.log('New index created successfully');
//   } catch (err) {
//     console.error('Error handling index:', err);
//   }
// };

// dropAndCreateIndex(); 

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

    // Search in OtherCollection
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

    // Combine results from both collections
    const combinedResults = [...resoResults, ...blogResults];

    res.json(combinedResults); // Send combined search results as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" }); 
  }
});
// app.post('/api/translate', async (req, res) => {
//   const { text, targetLanguage } = req.body;

//   try {
//       const result = await translate(text, { to: targetLanguage });
//       res.json({ translatedText: result.text });
//   } catch (error) {
//       console.error('Translation error:', error);
//       res.status(500).json({ error: 'Translation failed' });
//   }
// });







app.listen(5000,()=>{
    connectDB()
    console.log("app is running on port 5000")
})