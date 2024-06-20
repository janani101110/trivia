import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Resourcepost = ({ resoPost }) => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (userId) => {
    try {
      console.log(`Fetching user data for userId: ${userId}`);
      const response = await fetch(`http://localhost:5000/api/auth/details/${userId}`);
      if (!response.ok) {
        throw new Error(`Error fetching user data: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Fetched user data:', data);
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchAuthor = async () => {
      if (resoPost.postedBy) {
        try {
          const userData = await fetchUserData(resoPost.postedBy);
          setAuthor(userData);
        } catch (error) {
          console.error("Error fetching author:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [resoPost.postedBy]);

  return (
    <div className="res-post">
      <Link to={`/resopostdetails/${resoPost._id}`}>
        <div className="respostimg">
          <img src={resoPost.photo} alt={resoPost.title} className="res-post img" />
        </div>
        <div className="resuserdetails">
        {author && (
          <div className="authorInfo">
            <img
              src={author.profilePicture}
              alt=""
              className="authorProfilePicture"
            />
          </div>
        )}
          <p>{new Date(resoPost.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="respostcontent">
          <h3>{resoPost.title}</h3>
          <p>{resoPost.desc.slice(0, 200)}...<span>Read more</span></p>
        </div>
      </Link>
    </div>
  );
};

export default Resourcepost;
