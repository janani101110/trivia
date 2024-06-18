import React, { useState, useEffect } from "react";
import "./Blog.css";
import "./popularBlogpost.css"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import { useUsers } from "../../Context/UserContext";

const BlogPostCard = ({ blogPost }) => {
  const [author, setAuthor] = useState(null);
  const { user } = useUsers();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const navigate = useNavigate();

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/details/${userId}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await fetchUserData(blogPost.postedBy);
        const userData = await response.json();
        setAuthor(userData);
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };

    fetchAuthor();
  }, [blogPost.postedBy]);

  useEffect(() => {
    const checkBookmark = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/bookMarks/${user._id}`
          );
          const bookmarks = response.data;
          const isBookmarked = bookmarks.some(
            (bookmark) => bookmark.blogPost === blogPost._id
          );
          setIsBookmarked(isBookmarked);
        } catch (error) {
          console.error("Error fetching bookmarks:", error);
        }
      }
    };

    checkBookmark();
  }, [blogPost._id, user]);

  useEffect(() => {
    setLikesCount(blogPost.likes.length);
  }, [blogPost.likes]);

  if (!blogPost) {
    return null;
  }

  const createdAtDate = new Date(blogPost.createdAt);
  const createdDate = createdAtDate.toDateString();

  const handleBookmark = async () => {
    if (user) {
      try {
        await axios.post(`http://localhost:5000/api/bookMarks/bookmark`, {
          userId: user._id,
          blogPostId: blogPost._id,
        });
        console.log("Bookmark is working fine");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    } else {
      setTimeout(() => {
        window.alert("Please login to add Bookmarks.");
      }, 100);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const handleLike = async () => {
    console.log("like the post", user._id);
    try {
      await axios.post(`http://localhost:5000/api/blogPosts/${blogPost._id}/like`, { userId: user._id });
      setLikes(likes + 1);
      setLiked(true);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async () => {
    console.log("unlike the post", user._id);
    try {
      await axios.delete(`http://localhost:5000/api/blogPosts/${blogPost._id}/like/${user._id}`);
      setLikes(likes - 1);
      setLiked(false);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  return (
    <div className="blog-post-card">
      <div className="post-card-content">
        <Link
          style={{ textDecoration: "none" }}
          to={`/InsidePost/${blogPost._id}`}
          key={blogPost.id}
        >
          <div className="post-row">
            <img src={blogPost.photo} alt="" className="post-image" />
            <div className="post-details">
              <div className="post-title">{blogPost.title}</div>
              <div className="post-description">
                {blogPost.desc && blogPost.desc.split(" ").slice(0, 60).join(" ") + "... See more"}
              </div>
              <div className="post-date">{createdDate}</div>
            </div>
          </div>
        </Link>
      </div>
      <div className="post-footer">
        {author && (
          <div className="author-info">
            <img
              src={author.profilePicture}
              alt=""
              className="author-profile-picture"
            />
            {author.username}
          </div>
        )}
        <div className="likes-count">{likesCount} Likes</div>
        <button className="footer-button" onClick={handleBookmark}>
          <CIcon
            icon={icon.cilBookmark}
            size=""
            style={{ color: isBookmarked ? "purple" : "black" }}
            className="bookmark-icon"
          />
        </button>
        <button className="footer-button">
          <CIcon
            icon={icon.cilThumbUp}
            size=""
            style={{ "--ci-primary-color": "black" }}
            onClick={handleLike}
            className="like-icon"
          />
        </button>
        <button className="footer-button">
          <CIcon
            icon={icon.cilThumbDown}
            size=""
            style={{ "--ci-primary-color": "black" }}
            onClick={handleUnlike}
            className="unlike-icon"
          />
        </button>
      </div>
    </div>
  );
};

export default BlogPostCard;
