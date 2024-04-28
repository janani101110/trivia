import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUsers } from '../../Context/UserContext';
import Blogspost from "../Blogs/Blogspost";

const MySaves = () => {
  const [blogPosts, setBlogPosts] = useState([]); // Corrected state variable name
  const { user } = useUsers();

  useEffect(() => {
    const fetchBookmarkedPosts = async () => {
      try {
        if (user && user._id) { // Check if user and user._id are defined
          // Fetch all bookmarked posts for the current user
          const response = await axios.get(`http://localhost:5000/api/bookMarks/${user._id}`);
          const fetchedBlogPosts = response.data.map(item => item.blogPost);
          setBlogPosts(fetchedBlogPosts);
        }
      } catch (error) {
        console.error("Error fetching bookmarked posts:", error);
      }
    };
  
    fetchBookmarkedPosts();
  }, [user]);
  
  return (
    <div className="mySavesBody">
      <h2>My Saved Blog Posts</h2>
      {blogPosts.length === 0 ? (
        <p>No saved blog posts found.</p>
      ) : (
        <ul>
          {blogPosts.map((blogPost) => (
            <Blogspost
              style={{ textDecoration: "none" }}
              key={blogPost._id}
              blogPost={blogPost}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MySaves;
