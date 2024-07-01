import React, { useEffect, useState } from "react";
import AdminNavi from "./AdminNavi";
import axios from "axios";
import "./BlogsAdmin.css";
// scroll
import AOS from "aos";
import "aos/dist/aos.css";

const BlogsAdmin = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    AOS.refresh(); // Refresh AOS on component mount/update
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
      return res.data;
    } catch (err) {
      console.error(`Error fetching user profile for user ${userId}:`, err);
      return null;
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const blogPostsRes = await axios.get("http://localhost:5000/api/blogPosts");
      const blogPostsData = blogPostsRes.data;
      console.log("Fetched blog posts:", blogPostsData); // Debug log

      const userProfilesPromises = blogPostsData.map(async (post) => {
        const userProfile = await fetchUserProfile(post.postedBy);
        return { ...post, user: userProfile };
      });

      const mergedData = await Promise.all(userProfilesPromises);
      setBlogPosts(mergedData);
      console.log("Merged blog posts with user profiles:", mergedData); // Debug log
    } catch (err) {
      console.error("Error fetching blog posts:", err);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return (
    <div>
      <AdminNavi />
      <div className="admin_content">
        <h1>Blogs Page</h1> <br></br>
       
          <table className="blogTable">
            <thead>
              <tr>
                <th>Posted By</th>
                <th>Title</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {blogPosts.map((post) => (
                <tr key={post._id}>
                  <td>{post.user ? post.user.username : "Unknown"}</td>
                  <td>{post.title}</td>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        
      </div>
    </div>
  );
};

export default BlogsAdmin;
