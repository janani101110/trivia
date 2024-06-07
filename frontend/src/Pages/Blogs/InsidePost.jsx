import React, { useEffect, useState } from "react";
import "./InsidePost.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useUsers } from "../../Context/UserContext";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";

// Define the function to fetch user data
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/auth/details/${userId}`
    );
    return response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// InsidePost component to display details of a single blog post
export const InsidePost = () => {
  const blogPostId = useParams().id;
  const [blogPost, setBlogPost] = useState({});
  const [author, setAuthor] = useState(null);
  const { user } = useUsers();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Function to fetch the blog post details
    const fetchPost = async () => {
      try {
        // Fetching the blog post details from the server
        const res = await axios.get(
          `http://localhost:5000/api/blogPosts/${blogPostId}`
        );
        setBlogPost(res.data);
        fetchAuthor(res.data.postedBy);
        setLikes(res.data.likes); // Set initial likes count
        setLiked(res.data.likes.includes(user.userId)); // Check if user has already liked
      } catch (err) {
        console.error(err);
      }
    };

    // Calling the fetchPost function
    fetchPost();
  }, [blogPostId]);

  const fetchAuthor = async (userId) => {
    try {
      const userData = await fetchUserData(userId);
      setAuthor(userData);
    } catch (error) {
      console.error("Error fetching author:", error);
    }
  };

  const handleLike = async () => {
    // Perform like action
    console.log("like the post",user._id);
    try {
      await axios.post(`http://localhost:5000/api/blogPosts/${blogPost._id}/like`, { userId: user._id});
      setLikes(likes + 1);
      setLiked(true);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async () => {
    // Perform unlike action
    console.log("unlike the post",user._id);
    try {
      await axios.delete(`http://localhost:5000/api/blogPosts/${blogPost._id}/like/${user._id}`);
      setLikes(likes - 1);
      setLiked(false);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };
  

  return (
    <div className="InsidePost">
      <div className="Blog">
        <h1 className="blogTitle">{blogPost.title}</h1>
        <hr />
        <div className="insideBlogHeader">
          <div className="autherDetails">
            {author && (
              <img
                src={author.profilePicture}
                alt=""
                className="authorProfilePicture"
              />
            )}
            {author && (
              <p className="insideBlogAutherName"> {author.username} </p>
            )}
          </div>
          <p className="blogDate">
            Created at: {new Date(blogPost.createdAt).toLocaleString()}
          </p>
        </div>
        <img src={blogPost.photo} alt="" className="postImage" />
        <p className="blogbody"> {blogPost.desc} </p>
        <div>
          was this article helpful to you?  {"  "} {" "}
          <CIcon
                icon={icon.cilThumbUp}
                size=""
                style={{ "--ci-primary-color": "black" }}
                onClick={handleLike}
                className="insideBlogLike"
              />{"     "}
              <CIcon
                icon={icon.cilThumbDown}
                size=""
                style={{ "--ci-primary-color": "black" }}
                onClick={handleUnlike}
                className="insideBlogLike"
              />
        </div>
      </div>
      {/* Blog comments section */}
      <div className="BlogComments">
        <div className="blogCommentTitle"> Comments</div>
        <div className="insideBlogComment">
          <div className="flex flex-col space-y-5">
            <input
              type="text"
              placeholder="Enter Your Thoughts !"
              className="blogCommentTextArea"
              required
            />
            <button className="blogCommentButton">
              <CIcon
                icon={icon.cilCursor}
                size=""
                style={{ "--ci-primary-color": "black" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsidePost;