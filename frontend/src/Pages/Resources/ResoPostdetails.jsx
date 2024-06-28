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
  const [resorating, setResoRating] = useState(null);
  const [resohover, setResoHover] = useState(null);
  const [author, setAuthor] = useState(null);

  const handleStarClick = (rating) => {
    if (resorating === rating) {
      setResoRating(null);
    } else {
      setResoRating(rating);
    }
  };

  const { id: resoPostId } = useParams();
  const navigate = useNavigate();

  const [resoPost, setResoPost] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/details/${userId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const userData = await fetchUserData(resoPost.postedBy);
        setAuthor(userData); // Set author data
        console.log(userData);
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };

    fetchAuthor();
  }, [resoPost.postedBy]);


  const fetchResoPost = async () => {
    try {
      const res = await axios.get(`${URL}/api/resoposts/${resoPostId}`);
      setResoPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(`${URL}/api/resocomments/post/${resoPostId}`);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchResoPost();
    fetchPostComments();
  }, [resoPostId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${URL}/api/resocomments/create`,
        { comment, postId: resoPostId },
        { withCredentials: true }
      );
      fetchPostComments();
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`${URL}/api/resoposts/${resoPostId}`, {
        withCredentials: true,
      });
      navigate("/resources");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="reso-post-details-container">
      <div className="reso-post-title-wrapper">
        <h1 className="reso-post-title">{resoPost.title}</h1>
        <div className="reso-edit-delete-wrapper">
          <BiEdit
            className="reso-edit-icon"
            onClick={() => navigate("/resoeditpost/" + resoPostId)}
          />
          <MdDelete
            className="reso-delete-icon"
            onClick={handleDeletePost}
          />
        </div>
      </div>
      <div className="reso-post-info">
      {author && (
            <div className="authorInfo">
              <img
                src={author.profilePicture}
                alt={author.name}
                className="authorProfilePicture"
              />
              <p>{author.name}</p> {/* Display author name */}
            </div>
          )}
        <p>{new Date(resoPost.createdAt).toString().slice(0, 15)}</p>
      </div>
      <img src={resoPost.photo} alt="" className="reso-post-image" />
      <p className="reso-post-content">{resoPost.desc}</p>
      <div className="reso-post-categories">
        <p>Categories:</p>
        <div>
          {resoPost.categories?.map((c, i) => (
            <div key={i}>{c}</div>
          ))}
        </div>
      </div>
      
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
  <p>{resorating === null ? "0" : resorating} Star Rating</p>
</div>



      <div className="reso-comments-section">
        <h3>Comments:</h3>
        <div className="reso-write-comment">
          <input
            onChange={(e) => setComment(e.target.value)}
            type="text"
            value={comment}
            placeholder="Write a comment"
            className="resocomsection"
          />
          <button onClick={postComment}>Add Comment</button>
        </div>
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