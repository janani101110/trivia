import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Removed Link as it's not used
import Blogspost from "./Blogspost";
import PopularBlogpost from "./PopularBlogpost"; // Ensure the file exists in the same directory
import axios from "axios";
import { useUsers } from "../../Context/UserContext"; // Import user context
// import CIcon from "@coreui/icons-react";
// import * as icon from "@coreui/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SearchResults} from "../Resources/Sensors/SearchResults"


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
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const Blogs = () => {
  const [blogPost, setPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [sortOrder, setSortOrder] = useState("desc");
  const [activeFilter, setActiveFilter] = useState(null);
  const [topPosts, setTopPosts] = useState([]);
  const { user } = useUsers();
  const navigate = useNavigate();

  const sortPosts = async (order) => {
    try {
      let sortedPosts = [...blogPost];
      if (order === "asc") {
        sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
      } else if (order === "desc") {
        sortedPosts.sort((a, b) => b.title.localeCompare(a.title));
      } else if (order === "latest") {
        sortedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      setPost(sortedPosts);
      setSortOrder(order);
      setActiveFilter(order);
    } catch (err) {
      console.error("Error sorting blog posts:", err);
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blogPosts?sort=${sortOrder}`);
      setPost(res.data);
    } catch (err) {
      console.error("Error fetching blog posts:", err);
    }
  };

  const fetchTopPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogPosts/popularBlogs");
      setTopPosts(res.data);
    } catch (err) {
      console.error("Error fetching top posts:", err);
    }
  };

  useEffect(() => {
    const fetchAndSortPosts = async () => {
      sortPosts("latest");
      fetchBlogPosts("latest");
      fetchTopPosts();
    };

    fetchAndSortPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPost.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCreateClick = () => {
    if (!user) {
      setTimeout(() => {
        window.alert("Please login to create a blog post.");
      }, 100);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      navigate("/WriteBlog");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <div className={`blogHome`}>
      <div className="blogBanner">
        <div className="bannerSection">
          <p className="blogQuote">
            Join the community, Explore, Learn, Create - Your hub for all things
            electronic, empowering every step of your IoT journey with Trivia,
            and share your own insights with just a click!!
          </p>
          <br />
          <div className="Bannercreate">
            <button onClick={handleCreateClick} className="createLink">
              Create
            </button>
          </div>
        </div>
        <div className="BlogSearchDiv">
        <SearchResults/>
        </div>
      </div>

      <p className="PopularBlogsTopic">Our Most Popular Blogs</p>
      <Slider {...settings}>
        {topPosts.map((post) => (
          <div key={post._id}>
            <PopularBlogpost blogPost={post} />
          </div>
        ))}
      </Slider>

      <div className="blogFilters">
        <button
          className={`filterButton ${activeFilter === "latest" ? "activeFilterButton" : ""}`}
          onClick={() => sortPosts("latest")}
        >
          Latest
        </button>
        <button
          className={`filterButton ${activeFilter === "asc" ? "activeFilterButton" : ""}`}
          onClick={() => sortPosts("asc")}
        >
          A-Z
        </button>
        <button
          className={`filterButton ${activeFilter === "desc" ? "activeFilterButton" : ""}`}
          onClick={() => sortPosts("desc")}
        >
          Z-A
        </button>
      </div>

      <div className="bpost">
        {currentPosts.map((blogPost) => (
          <Blogspost
            style={{ textDecoration: "none" }}
            key={blogPost._id}
            blogPost={blogPost}
          />
        ))}
      </div>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={blogPost.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Blogs;
