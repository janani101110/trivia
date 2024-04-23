import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { Search } from "../../Component/Search/Search"; 
import Blogspost from './Blogspost';
import axios from "axios";
import { useUsers } from "../../Context/UserContext"; // Import user context

// Pagination component for rendering pagination controls
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  // Calculating the total number of pages
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    // Pagination navigation
    <nav>
      <ul className='pagination'>
        {/* Rendering pagination links */}
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            {/* Handling pagination click */}
            <a onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Main Blogs component
export const Blogs = () => {
  const [blogPost, setPost] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [postsPerPage] = useState(6);
  const [sortOrder, setSortOrder] = useState('desc');
  const [activeFilter, setActiveFilter] = useState(null); 
  const { user } = useUsers(); // Access user data from context
  const navigate = useNavigate(); // Use useNavigate hook

  // Function to sort posts based on order
  const sortPosts = async (order) => {
    try {
      let sortedPosts = [...blogPost];
      // Sorting logic based on order
      if (order === 'asc') {
        sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
      } else if (order === 'desc') {
        sortedPosts.sort((a, b) => b.title.localeCompare(a.title));
      }
      setPost(sortedPosts);
      setSortOrder(order);
      setActiveFilter(order);
    } catch (err) {
      console.error('Error sorting blog posts:', err);
    }
  };

  // Function to fetch blog posts from the server
  const fetchBlogPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blogPosts?sort=${sortOrder}`);
      setPost(res.data);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
    }
  };

  // Fetching blog posts on component mount
  useEffect(() => {
    fetchBlogPosts('desc');
    setActiveFilter('latest');
  }, []);

  // Calculating indexes of first and last posts for current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPost.slice(indexOfFirstPost, indexOfLastPost);

  // Function to change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  
  // Function to fetch latest posts
  const showLatestPosts = () => {
    fetchBlogPosts('-createdAt');
    setActiveFilter('latest');
  };

  // Function to get background class based on active filter
  const getBackgroundClass = () => {
    switch (activeFilter) {
      case 'latest':
        return 'latestBackground';
      case 'asc':
        return 'ascBackground';
      case 'desc':
        return 'descBackground';
      default:
        return 'defaultBackground';
    }
  };

  // Function to handle create button click
  const handleCreateClick = () => {
    if (!user) {
      setTimeout(() => {
        window.alert('Please login to create a blog post.'); // Show error message in alert box
      }, 100);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      // If user is logged in, navigate to create blog page
      navigate("/WriteBlog");
    }
  };
 
  // Rendering the component
  return (
    
    <div className={`blogHome ${getBackgroundClass()}`}>

      {/* Banner section */}
      <div className='blogBanner'>
        <div className='bannerSection'>
         <p className ="blogQuote"> Join the community, Explore, Learn, Create - Your hub for all things electronic, 
          empowering every step of your IoT journey with Trivia, and share your own insights with just a click!! </p>
        <br/>
        {/* Link to create a new blog */}
        <div className = "Bannercreate">
                <button onClick={handleCreateClick} className="createLink"> Create </button>
                
            </div>
        </div>
      </div>
      
      {/* Search component */}
      <Search />

      {/* Blog filters section */}
      <div className='blogFilters'> 
        {/* Filter buttons */}
        <button className ="filterButton">
          Popular
        </button>

        <button className={`filterButton ${activeFilter === 'latest' ? 'activeFilterButton' : ''}`} onClick={showLatestPosts}>
          Latest
        </button>

        <button className={`filterButton ${activeFilter === 'asc' ? 'activeFilterButton' : ''}`} onClick={() => sortPosts('asc')}>
          A-Z
        </button>

        <button className={`filterButton ${activeFilter === 'desc' ? 'activeFilterButton' : ''}`}  onClick={() => sortPosts('desc')}>
          Z-A
        </button>
      </div>

      {/* Blog posts section */}
      <div className='bpost'>
        {/* Rendering current posts */}
        {currentPosts.map((blogPost) => (
          <Blogspost style={{ textDecoration: 'none' }} key={blogPost._id} blogPost={blogPost} />
        ))}
      </div>


      {/* Pagination component */}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={blogPost.length}
        paginate={paginate}
      />
    </div>
  ); 
};

export default Blogs; // Exporting default component
