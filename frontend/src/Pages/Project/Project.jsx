import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { URL } from "../../url";
import "./ProjectHome.css";
import ProjectCard from "./ProjectCard";
import ProjectPgNavi from "./ProjectPgNavi";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
//import ProjectViewAll from "./ProjectViewAll";

export const Projects = () => {
  const [projectposts, setProjectposts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4); //number of posts to display per page.
  const [orderBy, setOrderBy] = useState("latest"); // Default order by latest
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

    //fetching approved data
    const fetchProjectposts = async (order) => {
      try {
        const res = await axios.get(URL + "/api/projectposts/");
        const approvedProjectposts = res.data.filter(projectpost => projectpost.approved);
          // Sort the approved projects by updatedAt date
      const sortedProjectposts = approvedProjectposts.sort((a, b) => {
        if (order === "latest") {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        } else {
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        }
      });
      setProjectposts(sortedProjectposts);
      } catch (err) {
        console.log(err);
      }
    };
  
    //to see the posts
    useEffect(() => {
      fetchProjectposts(orderBy);
    }, [orderBy]);

    
  // Fetch posts
  useEffect(() => {
    axios
      .get("/api/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts: ", error);
      });
  }, []);

  // Update likes for a post
  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };



// Get current posts based on order
const currentPosts = projectposts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

// Change page
const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

 // Handle ordering change
 const handleOrderByChange = (e) => {
  setOrderBy(e.target.value);
  setCurrentPage(1); // Reset to first page when changing order
};

const isAuthenticated = () => {
  // Replace this with your actual authentication logic
  return !!localStorage.getItem('token'); // Example using token stored in localStorage
}

const handlePostProject = () => {
  if (isAuthenticated()) {
    navigate('/projectform'); // Redirect to post project page
  } else {
    navigate('/signup'); // Redirect to signup page
  }
};

  return (
    <div>

      <div>
        <label htmlFor="orderBy">Order By:</label>
        <select id="orderBy" value={orderBy} onChange={handleOrderByChange}>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <div className="project_grid">
        {currentPosts.map((projectpost) => (
          <ProjectCard key={projectpost._id} projectpost={projectpost} />
        ))}
      </div>

      <ProjectPgNavi
        postsPerPage={postsPerPage}
        totalPosts={projectposts.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <hr className="project_line"></hr>

      <div className="project_box">
        <p id="para">
          If you are like to share your properly finished project <br /> among
          other electronic hobbists as you, <br /> This place is yours!
        </p>
       {/* <Link to="/projectform" rel="noopener noreferrer">*/}
          <button className="projectclick_button" onClick={handlePostProject}>
            Post Your Project Here!
          </button>
      {/*  </Link>*/}
      </div>
    </div>
  );
};

export default Projects;
