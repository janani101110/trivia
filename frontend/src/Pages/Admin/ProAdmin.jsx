import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNavi from "./AdminNavi";
import axios from "axios";
import { URL } from "../../url";
import AOS from "aos";
import "aos/dist/aos.css";
import "./ProAdmin.css";

const ProAdmin = () => {
  const [projectPosts, setProjectPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    AOS.refresh(); // Refresh AOS on component mount/update
  }, []);

  useEffect(() => {
    const fetchProjectPosts = async () => {
      try {
        const response = await axios.get(`${URL}/api/projectposts`);
        setProjectPosts(response.data);
      } catch (error) {
        console.error("Error fetching project posts:", error);
      }
    };

    fetchProjectPosts();
  }, []);

  useEffect(() => {
    const filteredProjects = projectPosts.filter((projectpost) => {
      if (selectedStatus === "pending") return !projectpost.approved && !projectpost.rejected;
      if (selectedStatus === "approved") return projectpost.approved;
      if (selectedStatus === "rejected") return projectpost.rejected;
      return true;
    });
    setFilteredPosts(filteredProjects);
    setCurrentPage(1); // Reset to the first page whenever the status filter changes
  }, [selectedStatus, projectPosts]);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div data-aos="fade-up">
      <AdminNavi />
      <div className="proAdmin_content">
        <div className="proAdmin_filter-dropdown">
          <label htmlFor="statusFilter">Select Status: </label>
          <select
            id="statusFilter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
                marginLeft: "10px",
                borderRadius: "5px",
                backgroundColor: "pink",
              }}
          >
            <option value="all">All</option>
            <option value="pending">Pending Approval</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <table className="proAdmin_table">
          <thead>
            <tr className="proAdmin_tr">
              <th className="proAdmin_th">Name</th>
              <th className="proAdmin_th">Project Name</th>
              <th className="proAdmin_th">Email</th>
              <th className="proAdmin_th">Time</th>
              <th className="proAdmin_th">Status</th>
              <th className="proAdmin_th">View</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((projectpost) => (
              <tr key={projectpost._id} className="proAdmin_tr">
                <td className="proAdmin_td">{projectpost.name}</td>
                <td className="proAdmin_td">{projectpost.project_name}</td>
                <td className="proAdmin_td">{projectpost.email}</td>
                <td className="proAdmin_td">
                  {new Date(projectpost.createdAt).toLocaleString()}
                </td>
                <td className="proAdmin_td">
                  {projectpost.approved
                    ? "Approved"
                    : projectpost.rejected
                    ? "Rejected"
                    : "Pending Approval"}
                </td>
                <td className="proAdmin_td">
                  <Link to={`/viewprojectadmin/${projectpost._id}?status=${selectedStatus}`}>
                    See More
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="proAdmin_pagination">
          {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`proAdmin_pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProAdmin;
