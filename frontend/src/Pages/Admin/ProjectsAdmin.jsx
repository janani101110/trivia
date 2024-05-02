import React from "react";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Admin from "./Admin";
import AdminNavi from "./AdminNavi";
import "./ProjectsAdmin.css";

const ProjectsAdmin = () => {
  const [projectPosts, setProjectPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/projectposts/')
      .then((response) => response.json())
      .then((data) => setProjectPosts(data))
      .catch((error) => console.error('Error fetching project posts:', error));
  }, []);

  return (
   
    <div>
       <AdminNavi></AdminNavi>
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
            <th>Action</th>
            
          </tr>
        </thead>
        <tbody>
          {projectPosts.map((projectpost) => (
              <tr key={projectpost.id}>
                <td>{projectpost.name}</td>
                <td>{projectpost.project_name}</td>
                <td>{projectpost.email}</td>
                <td>{projectpost.createdAt}</td>
                <td>{projectpost.approved ? 'Approved' : 'Pending Approval'}</td>
                <td>
                <Link to={`/viewprojectadmin/${projectpost._id}`} state={{ projectpost }}>See More</Link>
                </td>
                <td>
                  
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
