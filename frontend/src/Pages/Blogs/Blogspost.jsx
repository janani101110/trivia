import React, { useState, useEffect } from "react";
import "./Blog.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import { useUsers } from "../../Context/UserContext";

const Blogspost = ({ blogPost }) => {
  const [author, setAuthor] = useState(null);
  const { user } = useUsers();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(0); // State to hold the count of likes
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
        setAuthor(userData); // Set author data
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };

    fetchAuthor();
  }, [blogPost.postedBy]);

  useEffect(() => {
    // Check if the post is bookmarked by the user and update the state
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
    // Set the likes count from the length of the likes array
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
        // If bookmark doesn't exist, add it
        await axios.post(`http://localhost:5000/api/bookMarks/bookmark`, {
          userId: user._id,
          blogPostId: blogPost._id,
        });
        console.log("book mark is working fine");
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

  // Rendering the component
  return (
    <div className="mainpostcard">
      <div className="postCard">
        {/* Link to view full blog post */}
        <Link
          style={{ textDecoration: "none" }}
          to={`/InsidePost/${blogPost._id}`}
          key={blogPost.id}
        >
          <img src={blogPost.photo} alt="" className="blogPostImage" />
          <div className="blogPostText">
            <div className="blogPostTitle">{blogPost.title}</div>
            <br />
            <div className="blogPostostDetails">
              <div className="blogPostDescription">
                {blogPost.desc &&
                  blogPost.desc.split(" ").slice(0, 60).join(" ") + "... See more"}
              </div>
              <br />
            </div>
          </div>
        </Link>
      </div>
      <div className="blogCardFooter">
        {author && (
          <div className="authorInfo">
            <img
              src={author.profilePicture}
              alt=""
              className="authorProfilePicture"
            />
          </div>
        )}
        <div className="blogPostDate">{createdDate}</div>
        <div className="likesCount">{likesCount} Likes</div> {/* Display likes count */}
        <button className="BlogFooterkButton" onClick={handleBookmark}>
          <CIcon
            icon={icon.cilBookmark}
            size=""
            style={{ color: isBookmarked ? "purple" : "black" }}
            className="BlogFooteMarkIcon"
          />
        </button>
        <button className="BlogFooterkButton">
          <CIcon
            icon={icon.cilShare}
            size=""
            style={{ "--ci-primary-color": "black" }}
            className="BlogFooteMarkIcon"
          />
        </button>
      </div>
    </div>
  );
};

export default Blogspost;