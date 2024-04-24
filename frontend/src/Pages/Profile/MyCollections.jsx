import React, { useEffect, useState } from "react";
import Blogspost from "../Blogs/Blogspost";
import "./MyCollection.css";
import axios from "axios";
import { useUsers } from "../../Context/UserContext";

const MyCollections = () => {
  const [blogPost, setPost] = useState([]);
  const { user } = useUsers();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/blogPosts/user/${user._id}`
        );
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
      }
    };
    fetchBlogPosts();
  }, [user]);

  if (!user) {
    // Handle case where user data is not available
    return <div> User data not found! </div>;
  }

  return (
    <div className={`myCollection`}>
      <div className="myCollectonUser">
        <img src={user.profilePicture} alt="" className="myCollectionImg" />
        <p className="myCollectionHeaderText">{user.username}</p>
      </div>
      <div className="myCollectioFilterSection">
        <hr className="myCollectionLine" />
        <p className="myCollectionText"> Blogs : {blogPost.length}</p>

        <div className="myCollectionBlogs">
          {blogPost.map((blogPost) => (
            <Blogspost
              style={{ textDecoration: "none" }}
              key={blogPost._id}
              blogPost={blogPost}
            />
          ))}
        </div>

        <hr className="myCollectionLine" />
      </div>
    </div>
  );
};

export default MyCollections;
