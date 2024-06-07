import react from "react";
import { useState, useEffect } from "react";
import { ReactDOM } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import "./Admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faBars } from "@fortawesome/free-solid-svg-icons"
import { faBell, faHome, faMicrochip, faBook, faBlog, faCartShopping, faUser, faChartLine, faCircleCheck, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import BlogsAdmin from "./BlogsAdmin";
import PerformanceAdmin from "./PerformanceAdmin";
import ProjectsAdmin from "./ProjectsAdmin";
import ResourcesAdmin from "./ResourcesAdmin";
import ShoppingAdmin from "./ShoppingAdmin";
import UsersAdmin from "./UsersAdmin";
import AdminNavi from "./AdminNavi";
import PostCounts from "./PostCounts";



export const Admin = () => {
  const [counts, setCounts] = useState({ pending: 0, approved: 0, rejected: 0 });
  
  return (
    <div>
      <AdminNavi counts={counts || { pending: 0, approved: 0, rejected: 0 }} />
      <PostCounts setCounts={setCounts} />
      <div className="admin_content">
        <div className="admin_griditem1">Projects</div>
        <div className="admin_griditem2">
        <Link to={'/projectsadmin/pending'}><div className="admin_box">Pending Approval <br /> 
        <p className="countstyle">{counts.pending} </p></div></Link>
        <Link to={'/projectsadmin/approved'}><div className="admin_box">Approved project  <br />
        <p className="countstyle">{counts.approved}</p></div></Link>
        <Link to={'/projectsadmin/rejected'}><div className="admin_box">Rejected project  <br />
        <p className="countstyle">{counts.rejected}</p></div></Link>
        </div>
        <hr></hr>
        <div className="admin_griditem3">Resources</div>
        <div className="admin_griditem4">
        <Link to={'/projectsresources/pending'}><div className="admin_box">Resources to be commented</div></Link>
        <Link to={'/projectsresources/approved'}><div  className="admin_box">Approved resources</div></Link>
        <Link to={'/projectsresources/rejected'}> <div className="admin_box">Rejected resources</div></Link>
        </div>
        <hr></hr>
        <div className="admin_griditem6">
        <div className="admin_box">Blogs graph</div>
          <div className="admin_box">Shopping grpah</div>
          <div className="admin_box">Forum</div>
        </div>
      </div>

      {/* <FontAwesomeIcon icon="fa-solid fa-bars" /> */}

    </div>
  );
};

export default Admin;
