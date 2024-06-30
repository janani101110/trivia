import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

import AdminNavi from './AdminNavi';
import PostCounts from './PostCounts';
import AdStatsChart from './AdStatsChart';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const Admin = () => {
  const [counts, setCounts] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  });

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
          <Link to="/projectsadmin/pending">
            <div className="admin_box">
              Pending Approval <br />
              <p className="countstyle">{counts.pending} </p>
            </div>
          </Link>
          <Link to="/projectsadmin/approved">
            <div className="admin_box">
              Approved project <br />
              <p className="countstyle">{counts.approved}</p>
            </div>
          </Link>
          <Link to="/projectsadmin/rejected">
            <div className="admin_box">
              Rejected project <br />
              <p className="countstyle">{counts.rejected}</p>
            </div>
          </Link>
        </div>
        <hr></hr>
        <div className="admin_griditem3">Resources</div>
        <div className="admin_griditem4">
          <Link to="/projectsresources/pending">
            <div className="admin_box">Pending Resources</div>
          </Link>
          <Link to="/projectsresources/approved">
            <div className="admin_box">Approved resources</div>
          </Link>
          <Link to="/projectsresources/rejected">
            <div className="admin_box">Rejected resources</div>
          </Link>
        </div>
        <hr></hr>
        <div className="admin_griditem6">
          <div className="admin_box">Blogs graph</div>
          <div className="admin_box">
            Shopping graph <AdStatsChart />
          </div>
          <Link to="/forum">
          <div className="admin_box">Forum</div></Link>
        </div>
      </div>

    </div>
  );
};

export default Admin;
