import React, { useEffect, useState } from "react";
import BlogCard from "./blogCard/blogCard";
import ShopCard from "./shopCard/ShopCard";
import axios from "axios";
import { useUsers } from "../../Context/UserContext";
import "./MySaves.css";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";

const MyCollections = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [shoppost, setShopposts] = useState([]);
  const [showBlogGrid, setShowBlogGrid] = useState(false);
  const [showShopGrid, setShowShopGrid] = useState(false);
  const { user } = useUsers();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/blogPosts/user/${user._id}`
        );
        setBlogPosts(res.data);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
      }
    };
    if (user) {
      fetchBlogPosts();
    }
  }, [user]);

  
  useEffect(() => {
    const fetchShopPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/Shoppost/user/${user._id}`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data, 'shopPosts');
        setShopposts(data); // Update shopPosts state with fetched data
      } catch (err) {
        console.error('Error fetching shop posts:', err);
      }
    };

    if (user && user._id) {
      fetchShopPosts();
    }
  }, [user]);
  const handleBlogDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogPosts/${postId}`);
      setBlogPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Error deleting blog post:", err);
    }
  };

  const handleShopDelete = async (shoppostId) => {
    try {
      await axios.delete(`http://localhost:5000/api/Shoppost/${shoppostId}`);
      setShopposts((prevShopposts) => prevShopposts.filter((shoppost) => shoppost._id !== shoppostId));
    } catch (err) {
      console.error("Error deleting shop post:", err);
    }
  };

  if (!user) {
    return <div>User data not found!</div>;
  }

  const handleToggleBlogGrid = () => {
    setShowBlogGrid(!showBlogGrid);
  };

  const handleToggleShopGrid = () => {
    setShowShopGrid(!showShopGrid);
  };

  return (
    <div className="mySavesBody">
      <div className="UserDetailsDiv">
        <div className="UserInfo">
          {user && (
            <>
              <p className="UserName">{user.username}</p>
              <p className="UserEmail">Email: {user.email}</p>
            </>
          )}
        </div>
        <div className="UserProfilePicture">
          {user && (
            <img
              src={user.profilePicture}
              alt={`${user.username}`}
              className="UserImage"
            />
          )}
        </div>
      </div>
      <hr />
      <div className="mySaveBookMarksDiv">
        <div className="mySaveBookMarksSubDiv">
          <div className="mySaveTags">
            Blogs
            {"   "}
            <button onClick={handleToggleBlogGrid} className="toggleButton">
              {showBlogGrid ? (
                <CIcon
                  icon={icon.cilCaretTop}
                  size=""
                  style={{ "--ci-primary-color": "black" }}
                  className="dropdownIcon"
                />
              ) : (
                <CIcon
                  icon={icon.cilCaretBottom}
                  size=""
                  style={{ "--ci-primary-color": "black" }}
                  className="dropdownIcon"
                />
              )}
            </button>
          </div>
          <p className="UserBlogsCount">
            {" "}
            No of Blogs: {"   "} {blogPosts.length}{" "}
          </p>
        </div>

        {blogPosts.length === 0 ? (
          <p>No saved blog posts found.</p>
        ) : (
          <ul>
            {showBlogGrid
              ? blogPosts.map((blogPost) => (
                  <BlogCard
                    style={{ textDecoration: "none" }}
                    key={blogPost._id}
                    blogPost={blogPost}
                    onDelete={handleBlogDelete}
                  />
                ))
              : blogPosts.slice(0, 3).map((blogPost) => (
                  <BlogCard
                    style={{ textDecoration: "none" }}
                    key={blogPost._id}
                    blogPost={blogPost}
                    onDelete={handleBlogDelete}
                  />
                ))}
          </ul>
        )}
        
      </div>
      <hr />
      <div className="mySaveBookMarksDiv">
        <div className="mySaveBookMarksSubDiv">
          <div className="mySaveTags">
            Advertisements
            {"   "}
            <button onClick={handleToggleShopGrid} className="toggleButton">
              {showShopGrid ? (
                <CIcon
                  icon={icon.cilCaretTop}
                  size=""
                  style={{ "--ci-primary-color": "black" }}
                  className="dropdownIcon"
                />
              ) : (
                <CIcon
                  icon={icon.cilCaretBottom}
                  size=""
                  style={{ "--ci-primary-color": "black" }}
                  className="dropdownIcon"
                />
              )}
            </button>
          </div>
          <p className="UserBlogsCount">
            {" "}
            No of Ads: {"   "} {shoppost.length}{" "}
          </p>
        </div>
        {shoppost.length === 0 ? (
          <p>No saved blog posts found.</p>
        ) : (
          <ul>
            {showBlogGrid
              ? shoppost.map((shoppost) => (
                  <ShopCard
                    style={{ textDecoration: "none" }}
                    key={shoppost._id}
                    shoppost={shoppost}
                    onDelete={handleBlogDelete}
                  />
                ))
              : shoppost.slice(0, 3).map((shoppost) => (
                  <ShopCard
                    style={{ textDecoration: "none" }}
                    key={shoppost._id}
                    shoppost={shoppost}
                    onDelete={handleBlogDelete}
                  />
                ))}
          </ul>
        )}

       
      </div>
    </div>
  );
};

export default MyCollections;