import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Projectpost from "../../Pages/Project/ProjectCard";
import "../../Pages/Resources/Sensors/Sensors.css";
import { URL } from "../../url";
import { Search } from "../../Component/Search/Search";

export const ProjectSearch = () => {
  const { search } = useLocation();
  const [noResults, setNoResults] = useState(false);
  const [projectPosts, setProjectPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [searchInitiated, setSearchInitiated] = useState(false);

  const queryParams = new URLSearchParams(search);
  const query = queryParams.get("query");

  console.log("Search query:", query);

  const fetchPosts = async () => {
    try {
      const [projectRes] = await Promise.all([
        axios.get(`${URL}/api/projectposts?search=${query}`),
      ]);
      console.log("Fetched project posts:", projectRes.data);

      setProjectPosts(projectRes.data);

      if (projectRes.data.length === 0) {
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
  const currentProjectPosts = projectPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="sensorsCollect">
      <div className="reso-content-container">
        <Search defaultValue={query} />

        {searchInitiated && (
          <div className="res-posts-container">
            {!noResults ? (
              <>
                {currentProjectPosts.map((projectpost) => (
                  <Projectpost key={projectpost.id} projectpost={projectpost} />
                ))}
              </>
            ) : (
              <h3>No Posts Available</h3>
            )}
          </div>
        )}

        {searchInitiated && !noResults && (projectPosts.length > 0) && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={projectPosts.length}
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
