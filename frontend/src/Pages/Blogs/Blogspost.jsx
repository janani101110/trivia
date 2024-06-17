import React, { useState, useEffect } from "react";
import "./Blog.css";
import { Link } from "react-router-dom";

const Blogspost = ({ blogPost }) => {
  // Check if blogPost is available, if not return null
  const [author, setAuthor] = useState(null);

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
        console.log("the author is", userData); // Log userData instead of author
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };

    fetchAuthor();
  }, [blogPost.postedBy]);

  if (!blogPost) {
    return null;
  }

  const createdAtDate = new Date(blogPost.createdAt);
  const createdDate = createdAtDate.toDateString();

  // Rendering the component
  return (
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
              {blogPost.desc.split(" ").slice(0, 60).join(" ") + "... See more"}
            </div>
            <br />
          </div>
        </div>
      </Link>
      <div className='blogCardFooter'>
        {author && (
          <div className="authorInfo">
            <img
              src={author.profilePicture}
              alt=""
              className="authorProfilePicture"
            />
          </div>
        )}
        <div className="blogPostdate">{createdDate}</div>
      </div>
    </div>
  );
};

export default Blogspost;
