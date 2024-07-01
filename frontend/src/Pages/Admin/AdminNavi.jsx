import React from "react";
//import { useState, useEffect } from "react";
//import { ReactDOM } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faBars } from "@fortawesome/free-solid-svg-icons"
import { faBell, faHome, faMicrochip, faBook, faBlog, faCartShopping, faChartLine, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./AdminNavi.css";


export const AdminNavi = ({ counts = { pending: 0, approved: 0, rejected: 0 } }) => {

  return (
    <div>
      <div className="admin_container">
        <div className="admin_line_grid">
          <nav className="admin_nav">
            <h2>Gavesha</h2>
          </nav>
          <div className="admin_nav_grid">
            <li className="admin_notification-icon">
              <a href="#">
                <FontAwesomeIcon icon={faBell} />
                {counts.pending > 0 && <span className="admin_notification-count">{counts.pending}</span>}
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faUserCircle} />
              </a>
            </li>
          </div>
        </div>

        <div className="admin_sidebar-container">
          <div className="admin_nav-option">
            <li>
              <a href="/admin" >
                <FontAwesomeIcon icon={faHome} /> Dashboard{" "}
              </a> 
            </li>

           <Link to={'/proadmin'}> <li>
              <a href="">
                <FontAwesomeIcon icon={faMicrochip} /> Projects{" "}
              </a>
            </li></Link>

           <Link to={'/projectsresources'}>  <li> 
              <a href="">
                <FontAwesomeIcon icon={faBook} /> Resources{" "}
              </a>
            </li></Link>

            <Link to={'/blogsadmin'}> <li>
              <a href="#">
                <FontAwesomeIcon icon={faBlog} /> Blogs{" "}
              </a>
            </li></Link> 

           <Link to={'/shoppingsadmin'}> <li>
              <a href="#">
                <FontAwesomeIcon icon={faCartShopping} /> Shopping{" "}
              </a>
            </li></Link> 

     { /*     <Link to={'/usersadmin'}> <li>
              <a href="#">
                <FontAwesomeIcon icon={faUser} /> Users{" "}
              </a>
            </li></Link> */}

            <Link to={'/performanceadmin'}> <li>
              <a href="#">
                <FontAwesomeIcon icon={faChartLine} /> Performance{" "}
              </a>
            </li></Link> 

          </div>
        </div>
      </div>
      
    

      {/* <FontAwesomeIcon icon="fa-solid fa-bars" /> */}

    </div>
  );
};

export default AdminNavi;