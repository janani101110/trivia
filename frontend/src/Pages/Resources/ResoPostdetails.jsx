import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../url";
import { useParams } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import "./ResoPostdetails.css";
import { ResoComment } from "./ResoComment";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export const ResoPostdetails = () => {
  // State variables for rating
  const [resorating, setResoRating] = useState(null);
  const [resohover, setResoHover] = useState(null);

  // Function to handle star click
  const handleStarClick = (rating) => {
    if (resorating === rating) {
      // If the user clicks on the already selected rating, deselect it (set to 0)
      setResoRating(null);
    } else {
      setResoRating(rating);
    }
  };

  // Get the resource post ID from URL params
  const { id: resoPostId } = useParams();

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // State variables for resource post and comments
  const [resoPost, setResoPost] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  // Function to fetch resource post details
  const fetchResoPost = async () => {
    try {
      const res = await axios.get(`${URL}/api/resoposts/${resoPostId}`);
      setResoPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to fetch comments for the post
  const fetchPostComments = async () => {
    try {
      const res = await axios.get(`${URL}/api/resocomments/post/${resoPostId}`);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Effect to fetch post details and comments when component mounts or resoPostId changes
  useEffect(() => {
    fetchResoPost();
    fetchPostComments();
  }, [resoPostId]);

  // Function to post a comment
  const postComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${URL}/api/resocomments/create`,
        { comment, postId: resoPostId },
        { withCredentials: true }
      );
      fetchPostComments(); // Refresh comments after posting
      setComment(""); // Clear comment input
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle post deletion
  const handleDeletePost = async () => {
    try {
      await axios.delete(`${URL}/api/resoposts/${resoPostId}`, {
        withCredentials: true,
      });
      navigate("/motionSen"); // Navigate to motionSen page after successful deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="reso-post-details-container">
      {/* Post title and edit/delete icons */}
      <div className="reso-post-title-wrapper">
        <h1 className="reso-post-title">{resoPost.title}</h1>
        <div className="reso-edit-delete-wrapper">
          <BiEdit
            className="reso-edit-icon"
            onClick={() => navigate("/resoeditpost/" + resoPostId)}
          />{" "}
          {/* Edit icon */}
          <MdDelete
            className="reso-delete-icon"
            onClick={handleDeletePost}
          />{" "}
          {/* Delete icon */}
        </div>
      </div>
      {/* Post information */}
      <div className="reso-post-info">
        <p>@chathuabeyrathne</p> {/* Author */}
        <p>{new Date(resoPost.createdAt).toString().slice(0, 15)}</p>{" "}
        {/* Creation date */}
      </div>
      <img src={resoPost.photo} alt="" className="reso-post-image" />{" "}
      {/* Post image */}
      <p className="reso-post-content">{resoPost.desc}</p> {/* Post content */}
      {/* Categories */}
      <div className="reso-post-categories">
        <p>Categories:</p>
        <div>
          {resoPost.categories?.map((c, i) => (
            <div key={i}>{c}</div>
          ))}
        </div>
      </div>
      {/* Star rating */}
      <div className="resoStarRating">
        {[0, ...Array(4)].map((_, index) => {
          const currentResoRating = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="resorating"
                value={currentResoRating}
                checked={currentResoRating === resorating}
                onChange={() => handleStarClick(currentResoRating)}
              />
              <FaStar
                className="resoStar"
                size={20}
                color={
                  currentResoRating <= (resohover || resorating)
                    ? "#ffc107"
                    : "#e4e5e9"
                }
                onMouseEnter={() => setResoHover(currentResoRating)}
                onMouseLeave={() => setResoHover(null)}
              />
            </label>
          );
        })}
        <p>{resorating === null ? "0" : resorating} Star Rating</p>{" "}
        {/* Display selected star rating */}
      </div>
      {/* Comments section */}
      <div className="reso-comments-section">
        <h3>Comments:</h3>

        {/* Input field for writing a comment */}
        <div className="reso-write-comment">
          <input
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Write a comment"
            className="resocomsection"
          />
          <button onClick={postComment}>Add Comment</button>{" "}
          {/* Button to add a comment */}
        </div>

        {/* Display comments */}
        {comments.map((c) => (
          <ResoComment
            key={c._id}
            c={c}
            fetchPostComments={fetchPostComments}
          />
        ))}
      </div>
    </div>
  );
};
