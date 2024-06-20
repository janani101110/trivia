import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
//import Admin from "./Admin";
import AdminNavi from "./AdminNavi";
import "./ProjectsAdmin.css";
import axios from "axios";
import { URL } from "../../url";

const ProjectsAdmin = () => {
  const [projectPosts, setProjectPosts] = useState([]);
  const { status } = useParams(); // Get the status from the URL

  useEffect(() => {
    const fetchProjectPosts = async () => {
      try {
        const response = await axios.get(`${URL}/api/projectposts`);
        // Filter the projects based on the status parameter
        const filteredProjects = response.data.filter((projectpost) => {
          if (status === "pending")
            return !projectpost.approved && !projectpost.rejected;
          if (status === "approved") return projectpost.approved;
          if (status === "rejected") return projectpost.rejected;
          return true;
        });
        setProjectPosts(filteredProjects);
      }catch (error) {
        console.error("Error fetching project posts:", error);
      }
    };

    fetchProjectPosts();
  }, [status]);


  return (
    <div>
      <AdminNavi />
      <div className="admin_content">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Project Name</th>
              <th>Email</th>
              <th>Time</th>
              <th>Stauts</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {projectPosts.map((projectpost) => (
              <tr key={projectpost._id}>
                <td>{projectpost.name}</td>
                <td>{projectpost.project_name}</td>
                <td>{projectpost.email}</td>
                {/*<td>{projectpost.createdAt}</td> */}
                <td>{new Date(projectpost.createdAt).toLocaleString()}</td>
                <td>
                  {projectpost.approved
                    ? "Approved"
                    : projectpost.rejected
                    ? "Rejected"
                    : "Pending Approval"}
                </td>
                <td>
                  <Link
                    to={`/viewprojectadmin/${projectpost._id}?status=${status}`}
                  >
                    See More
                  </Link>
                </td>
            
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsAdmin;
