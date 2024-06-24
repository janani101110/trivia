import React, { useEffect, useState } from "react";
import "./InsidePost.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useUsers } from "../../Context/UserContext";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import { BlogComment } from "./BlogComment";

const URL = "http://localhost:5000"; // Define your base URL here

const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`${URL}/api/auth/details/${userId}`);
    return response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const InsidePost = () => {
  const { id: blogPostId } = useParams();
  const [blogPost, setBlogPost] = useState({});
  const [author, setAuthor] = useState(null);
  const { user } = useUsers();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${URL}/api/blogPosts/${blogPostId}`);
      setBlogPost(res.data);
      fetchAuthor(res.data.postedBy);
    } catch (err) {
      console.error("Error fetching blog post:", err);
    }
  };

  const fetchAuthor = async (userId) => {
    try {
      const userData = await fetchUserData(userId);
      setAuthor(userData);
    } catch (error) {
      console.error("Error fetching author:", error);
    }
  };

  const handleLike = async () => {
    try {
      await axios.post(`${URL}/api/blogPosts/${blogPost._id}/like`, { userId: user._id });
      setLikes(likes + 1);
      setLiked(true);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      await axios.delete(`${URL}/api/blogPosts/${blogPost._id}/like/${user._id}`);
      setLikes(likes - 1);
      setLiked(false);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const fetchBlogComments = async () => {
    try {
      const res = await axios.get(`${URL}/api/blogComments/post/${blogPostId}`);
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching blog comments:", err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchBlogComments();
  }, [blogPostId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${URL}/api/blogComments/create`,
        { comment, postId: blogPostId, postedBy:user._id },
        { withCredentials: true }
      );
      fetchBlogComments();
      setComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      postComment(e);
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
              <Link
                style={{ textDecoration: "none" }}
                to={`/authorpage/${author._id}`}
                key={author.id}
              >
                <img
                  src={author.profilePicture}
                  alt=""
                  className="authorProfilePicture"
                />
                <p className="insideBlogAutherName"> {author.username} </p>
              </Link>
            )}
          </div>
          <p className="blogDate">
            Created at: {blogPost.createdAt ? new Date(blogPost.createdAt).toLocaleString() : "Unknown date"}
          </p>
        </div>
        <img src={blogPost.photo} alt="" className="postImage" />
        <p
          className="blogbody"
          dangerouslySetInnerHTML={{ __html: blogPost.desc }}
        />
      </div>

      <div className="insideBlogLikeContainer">
        <span className="insideBlogText">
          Was this Article helpful to you?
        </span>
        <CIcon
          icon={icon.cilThumbUp}
          size=""
          style={{ "--ci-primary-color": "black" }}
          onClick={handleLike}
          className="insideBlogLike"
        />
        <CIcon
          icon={icon.cilThumbDown}
          size=""
          style={{ "--ci-primary-color": "black" }}
          onClick={handleUnlike}
          className="insideBlogLike"
        />
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
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={handleKeyDown}
              required
            />
            {/* <button className="blogCommentButton" onClick={postComment}>
              <CIcon
                icon={icon.cilCursor}
                size="mm"
                style={{ "--ci-primary-color": "black" }}
                className="blogCommentButtonIcon"
              />
            </button> */}
          </div>
        </div>
        <div className="blog-comments-section">
          
          {comments.map((c) => (
            <BlogComment key={c._id} c={c} fetchBlogComments={fetchBlogComments} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsidePost;
