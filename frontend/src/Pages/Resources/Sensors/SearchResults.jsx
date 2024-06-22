// Import necessary hooks and libraries
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Resourcepost from "../Resourcepost";
import "./Sensors.css";
import { URL } from "../../../url";
import { Search } from "../../../Component/Search/Search";

export const SearchResults = () => {
  const { search } = useLocation(); // Get search query from URL
  const [noResults, setNoResults] = useState(false); // State to track if there are no search results
  const [resoPosts, setResoPosts] = useState([]); // State to store resource posts
  const [currentPage, setCurrentPage] = useState(1); // State to manage current page number
  const [postsPerPage] = useState(6); // Number of posts to display per page
  const [searchInitiated, setSearchInitiated] = useState(false); // State to track if search has been initiated

  // Function to fetch resource posts from the server
  const fetchResoPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/resoposts/" + search); // Fetch posts based on search query
      setResoPosts(res.data); // Set fetched posts in state
      // Check if there are no search results
      if (res.data.length === 0) {
        setNoResults(true); // Update state to indicate no search results
      } else {
        setNoResults(false); // Reset state if there are search results
      }
    } catch (err) {
      console.log(err); // Log error if fetching fails
    }
  };

  // useEffect hook to fetch resource posts when search query changes
  useEffect(() => {
    if (search) {
      setSearchInitiated(true); // Mark that a search has been initiated
      fetchResoPosts(); // Fetch posts on component mount and when search query changes
    }
  }, [search]);

  // Calculate index of last and first post to display on current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // Slice the array of posts to display only those for the current page
  const currentPosts = resoPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="sensorsCollect">
      <div className="reso-content-container">
        <Search /> {/* Search component */}

        {searchInitiated && (
          <div className="res-posts-container">
            {/* Check if there are search results */}
            {!noResults ? (
              // If there are search results, map over currentPosts and render Resourcepost component for each post
              currentPosts.map((resoPost) => (
                <Resourcepost key={resoPost.id} resoPost={resoPost} />
              ))
            ) : (
              // If there are no search results, display a message
              <h3>No Posts Available</h3>
            )}
          </div>
        )}

        {/* Pagination component */}
        {searchInitiated && !noResults && resoPosts.length > 0 && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={resoPosts.length}
            paginate={paginate}
          />
        )}
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
