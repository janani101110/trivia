import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import { useUsers } from "../../Context/UserContext";
import { formatDistanceToNow, format } from "date-fns";
import "./popularBlogpost.css";
import Notification from './BlogNotification';
import ShareBox from './ShareBox';

const BlogPostCard = ({ blogPost }) => {
  const [author, setAuthor] = useState(null);
  const { user } = useUsers();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [unLiked, setUnLiked] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [comments, setComments] = useState([]);
  const [showShareBox, setShowShareBox] = useState(false);
const [shareUrl, setShareUrl] = useState('');
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const userData = await fetchUserData(blogPost.postedBy);
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

  const createdAtDate = new Date(blogPost.createdAt);
  const timeAgo = formatDistanceToNow(createdAtDate, { addSuffix: true });
  const formattedDate = format(createdAtDate, "MMM dd");

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
      await axios.post(
        `http://localhost:5000/api/blogPosts/${blogPost._id}/like`,
        { userId: user._id }
      );
      setLikesCount(likesCount + 1);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async () => {
    console.log("unlike the post", user._id);
    try {
      await axios.delete(
        `http://localhost:5000/api/blogPosts/${blogPost._id}/like/${user._id}`
      );
      setLikesCount(likesCount - 1);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const fetchBlogComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blogComments/post/${blogPost._id}`);
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching blog comments:", err);
    }
  };

  useEffect(() => {
    fetchBlogComments();
  }, [blogPost._id]);

  const toggleShareBox = () => {
    setShowShareBox(!showShareBox);
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
              <div
                className="post-description"
                dangerouslySetInnerHTML={{
                  __html:
                    blogPost.desc.split(" ").slice(0, 30).join(" ") +
                    "... See more",
                }}
              ></div>
              {author && (
                 <Link style={{ textDecoration: "none" }} to={`/authorpage/${author._id}`} key={author.id}>
                <div className="BlogCardAuthorInfo">
                  <img
                    src={author.profilePicture}
                    alt=""
                    className="authorProfilePicture"
                  />
                  <p className="authorUsername"> {author.username} </p>
                </div>
                </Link>
              )}
            </div>{" "}
          </div>
          </Link>
          <div className="blogCardFooterMainDIv">
            <div className="blogCardFooterRow">
              <button className="BlogFooterkButton" onClick={handleLike}>
                <CIcon
                  icon={icon.cilThumbUp}
                  size=""
                  style={{ "--ci-primary-color": "black" }}
                  className="insideBlogLike"
                />
                <span className="likesCount">{likesCount} Likes</span>
              </button>
              <button className="BlogFooterkButton" onClick={handleUnlike}>
                <CIcon
                  icon={icon.cilThumbDown}
                  size=""
                  style={{ "--ci-primary-color": "black" }}
                  className="insideBlogLike"
                />
                <span className="CommentCount">
                  <CIcon
                    icon={icon.cilCommentBubble}
                    size=""
                    style={{ "--ci-primary-color": "black" }}
                    className="insideBlogLike"
                  />
                  {comments.length}
                </span>
              </button>
              <div className="blogPostDate">
                {createdAtDate > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  ? timeAgo
                  : formattedDate}
              </div>

              <div className="bookmarkWrapper">
  <button
    className="BlogFooterkButton"
    onClick={toggleShareBox}
  >
  
    <CIcon
      icon={icon.cilShareAlt}
      size=""
      style={{ color:"black" }}
      className="BlogFooteMarkIcon"
    />
  </button>
  {showShareBox && <ShareBox postUrl={blogPost.url} onClose={toggleShareBox} />}
</div>

              <div className="bookmarkWrapper">
                <button className="BlogFooterkButton" onClick={handleBookmark}>
                  <CIcon
                    icon={icon.cilBookmark}
                    size=""
                    style={{ color: isBookmarked ? "purple" : "black" }}
                    className="BlogFooteMarkIcon"
                  />
                </button>
              </div>
            </div>
          </div>
       
      </div>
      {showNotification && (
        <Notification
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default BlogPostCard;