import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import BlogsAdmin from "./BlogsAdmin";
// import other components as necessary
import AdminNavi from "./AdminNavi";
import PostCounts from "./PostCounts";
import AdminGraph from "./AdminGraph"; // Adjust the import path as necessary
import AdStatsChart from "./AdStatsChart";
import useIncrementingCount from "./useIncrementingCount"; // Import the custom hook

// scroll
import AOS from "aos";
import "aos/dist/aos.css";

export const Admin = () => {
  const [counts, setCounts] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  // count increment effect
  const animatedPendingCount = useIncrementingCount(counts.pending);
  const animatedApprovedCount = useIncrementingCount(counts.approved);
  const animatedRejectedCount = useIncrementingCount(counts.rejected);

  useEffect(() => {
    AOS.refresh(); // Refresh AOS on component mount/update
  }, []);

  return (
    <div data-aos="fade-up">
      <AdminNavi counts={counts || { pending: 0, approved: 0, rejected: 0 }} />
      <PostCounts setCounts={setCounts} />
      <div className="admin_content">
        <div className="admin_griditem1">Projects</div>
        <div className="admin_griditem2">
          <Link to={"/projectsadmin/pending"}>
            <div className="admin_box">
              Pending Approval <br />
              <p className="countstyle">{animatedPendingCount} </p>
            </div>
          </Link>
          <Link to={"/projectsadmin/approved"}>
            <div className="admin_box">
              Approved project <br />
              <p className="countstyle">{animatedApprovedCount}</p>
            </div>
          </Link>
          <Link to={"/projectsadmin/rejected"}>
            <div className="admin_box">
              Rejected project <br />
              <p className="countstyle">{animatedRejectedCount}</p>
            </div>
          </Link>
        </div>
        <hr></hr>
        <div className="admin_griditem3">Resources</div>
        <div className="admin_griditem4">
          <Link to={"/projectsresources/pending"}>
            <div className="admin_box">Pending Resources</div>
          </Link>
          <Link to={"/projectsresources/approved"}>
            <div className="admin_box">Approved resources</div>
          </Link>
          <Link to={"/projectsresources/rejected"}>
            {" "}
            <div className="admin_box">Rejected resources</div>
          </Link>
        </div>
        <hr></hr>
        <div className="admin_griditem6_new">
          <Link to='/shoppingsadmin' className="admin_box graph">
            Shopping graph <AdStatsChart />
          </Link>
          <Link to="/blogsadmin" className="admin_box blogs">
            Blogs
          </Link>
          <Link to="/forum" className="admin_box forum" target="_blank"> 
            Community meet up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
