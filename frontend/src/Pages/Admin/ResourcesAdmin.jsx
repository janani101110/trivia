import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AdminNavi from "./AdminNavi";
import "./ProjectsAdmin.css"; // Reuse the same CSS for simplicity
import axios from "axios";
import { URL } from "../../url";
import AOS from "aos";
import "aos/dist/aos.css";

const ResourcesAdmin = () => {
  const [resourcePosts, setResourcePosts] = useState([]);
  const { status } = useParams();

  useEffect(() => {
    AOS.refresh();
  }, []);

  useEffect(() => {
    const fetchResourcePosts = async () => {
      try {
        const response = await axios.get(`${URL}/api/resoposts`);
        const filteredResources = response.data.filter((posts) => {
          if (status === "pending")
            return !posts.approved && !posts.rejected;
          if (status === "approved") return posts.approved;
          if (status === "rejected") return posts.rejected;
          return true;
        });
        setResourcePosts(filteredResources);
      } catch (error) {
        console.error("Error fetching resource posts:", error);
      }
    };

    fetchResourcePosts();
  }, [status]);

  return (
    <div data-aos="fade-up">
      <AdminNavi />
      <div className="admin_content">
        <table>
          <thead>
            <tr className="admin_tr">
              <th className="admin_th">Title</th>
              <th className="admin_th">Posted By</th>
              <th className="admin_th">Time</th>
              <th className="admin_th">Status</th>
              <th className="admin_th">View</th>
            </tr>
          </thead>
          <tbody>
            {resourcePosts.map((resoPost) => (
              <tr key={resoPost._id} className="admin_tr">
                <td className="admin_td">{resoPost.title}</td>
                <td className="admin_td">{resoPost.postedBy.username}</td>
                <td className="admin_td">{new Date(resoPost.createdAt).toLocaleString()}</td>
                <td className="admin_td">
                  {resoPost.approved
                    ? "Approved"
                    : resoPost.rejected
                    ? "Rejected"
                    : "Pending Approval"}
                </td>
               
                <td className="admin_td">
                  <Link to={`/resopostdetail/${resoPost._id}`} className="admin_button">
                    View
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

export default ResourcesAdmin;
