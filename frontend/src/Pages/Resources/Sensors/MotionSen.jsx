import React, { useEffect, useState } from "react";
import "./Sensors.css";
import Button from "../Button";
import Sidebar from "../Sidebar";
import Resourcepost from "../Resourcepost";
import { Link } from "react-router-dom";
import { URL } from "../../../url";
import axios from "axios";

// Functional component for motion sensors page
export const MotionSen = () => {
  const [resoPosts, setResoPosts] = useState([]); // State to store resource posts
  const [currentPage, setCurrentPage] = useState(1); // State to manage current page number
  const [postsPerPage] = useState(6); // Number of posts to display per page

  // Function to fetch resource posts from the server
  const fetchResoPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/resoposts"); // Fetch all resource posts
      setResoPosts(res.data); // Set fetched posts in state
    } catch (err) {
      console.log(err); // Log error if fetching fails
    }
  };

  // useEffect hook to fetch resource posts on component mount
  useEffect(() => {
    fetchResoPosts(); // Fetch posts on component mount
  }, []);

  // Calculate index of last and first post to display on current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // Slice the array of posts to display only those for the current page
  const currentPosts = resoPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="sensorsCollect">
      <Sidebar /> {/* Sidebar component */}
      <div className="reso-content-container">
        <div className="resocustom-button">
          {/* Button to navigate to write post page */}
          <Link to="/writepost">
            <Button
              label="Write"
              onClick={() => console.log("Button clicked")}
            />
          </Link>
        </div>
        <h1 className="resoTitle" id="motion">
          MOTION SENSORS
        </h1>{" "}
        {/* Title */}
        <div className="res-posts-container">
          {/* Map over currentPosts and render Resourcepost component for each post */}
          {currentPosts.map((resoPost) => (
            <Resourcepost key={resoPost.id} resoPost={resoPost} />
          ))}
        </div>
        {/* Pagination component */}
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={resoPosts.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

// Pagination component
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = []; // Array to store page numbers

  // Calculate total number of pages
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i); // Push each page number to the array
  }

  return (
    <nav>
      <ul className="pagination">
        {/* Map over pageNumbers array and render pagination buttons */}
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            {/* Button to paginate */}
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
