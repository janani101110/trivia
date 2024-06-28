import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Resourcepost from "../Resourcepost";
import Blogpost from "../../Blogs/Blogspost"; // Import the Blogpost component
import "./Sensors.css";
import { URL } from "../../../url";
import { Search } from "../../../Component/Search/Search";

export const SearchResults = () => {
  const { search } = useLocation();
  const [noResults, setNoResults] = useState(false);
  const [resoPosts, setResoPosts] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]); // State to store blog posts
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [searchInitiated, setSearchInitiated] = useState(false);

  const queryParams = new URLSearchParams(search);
  const query = queryParams.get("query");

  console.log("Search query:", query);

  const fetchPosts = async () => {
    try {
      const [resoRes, blogRes] = await Promise.all([
        axios.get(`${URL}/api/resoposts?search=${query}`),
        axios.get(`${URL}/api/blogposts?search=${query}`), // Fetch blog posts
      ]);
      console.log("Fetched reso posts:", resoRes.data);
      console.log("Fetched blog posts:", blogRes.data);

      setResoPosts(resoRes.data);
      setBlogPosts(blogRes.data);

      if (resoRes.data.length === 0 && blogRes.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } catch (err) {
      console.log("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    if (query) {
      setSearchInitiated(true);
      fetchPosts();
    }
  }, [query]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentResoPosts = resoPosts.slice(indexOfFirstPost, indexOfLastPost);
  const currentBlogPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="sensorsCollect">
      <div className="reso-content-container">
        <Search defaultValue={query} />

        {searchInitiated && (
          <div className="res-posts-container">
            {!noResults ? (
              <>
                {currentResoPosts.map((resoPost) => (
                  <Resourcepost key={resoPost.id} resoPost={resoPost} />
                ))}
                {currentBlogPosts.map((blogPost) => (
                  <Blogpost key={blogPost.id} blogPost={blogPost} />
                ))}
              </>
            ) : (
              <h3>No Posts Available</h3>
            )}
          </div>
        )}

        {searchInitiated && !noResults && (resoPosts.length > 0 || blogPosts.length > 0) && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={resoPosts.length + blogPosts.length}
            paginate={paginate}
          />
        )}
      </div>
    </div>
  );
};

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
