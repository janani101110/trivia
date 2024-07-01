import React,{useState} from "react";
//import { useState, useEffect } from "react";
//import { ReactDOM } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faBars } from "@fortawesome/free-solid-svg-icons"
import { faBell, faHome, faMicrochip, faBook, faBlog, faCartShopping, faUser, faChartLine, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./AdminNavi.css";
import AdminDropdown from "./AdminDropdown";
import { useUsers } from "../../Context/UserContext";

export const AdminNavi = ({ counts = { pending: 0, approved: 0, rejected: 0 } }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { user, fetchUsers } = useUsers();
  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname); // default to dashboard
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  
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
              <span className="admin_tooltip">Projects pending approval: {counts.pending}</span>
              <div className="admin_notification-box">
                <p>You have {counts.pending} projects for pending approval.</p>
                {/* Additional notification details can go here */}
              </div>
            </li>
            <li>
            <div className="menu"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
            <FontAwesomeIcon icon={faUserCircle} />
          
          {isDropdownVisible && <AdminDropdown />}
        </div>
             { /*
              <a href="#">
                <FontAwesomeIcon icon={faUserCircle} />
              </a>
              */}
            </li>
          </div>
        </div>

        <div className="admin_sidebar-container">
          <div className="admin_nav-option">
          <li className={activeLink === '/admin' ? 'active' : ''}>
              <Link to="/admin" onClick={() => handleLinkClick('/admin')}>
                <FontAwesomeIcon icon={faHome} /> Dashboard
              </Link>
            </li>

            <li className={activeLink === '/proadmin' ? 'active' : ''}>
              <Link to="/proadmin" onClick={() => handleLinkClick('/proadmin')}>
                <FontAwesomeIcon icon={faMicrochip} /> Projects
              </Link>
            </li>

            <li className={activeLink === '/resourcesadmin' ? 'active' : ''}>
              <Link to="/admin" onClick={() => handleLinkClick('/resourcesadmin')}>
                <FontAwesomeIcon icon={faBook} /> Resources
              </Link>
            </li>

            <li className={activeLink === '/blogsadmin' ? 'active' : ''}>
              <Link to="/blogsadmin" onClick={() => handleLinkClick('/blogsadmin')}>
                <FontAwesomeIcon icon={faBlog} /> Blogs
              </Link>
            </li>

         <li className={activeLink === '/shoppingsadmin' ? 'active' : ''}>
              <Link to="/shoppingsadmin" onClick={() => handleLinkClick('/shoppingsadmin')}>
                <FontAwesomeIcon icon={faCartShopping} /> Shopping
              </Link>
            </li>

     { /*     <Link to={'/usersadmin'}> <li>
              <a href="#">
                <FontAwesomeIcon icon={faUser} /> Users{" "}
              </a>
            </li></Link> */}

<li className={activeLink === '/performanceadmin' ? 'active' : ''}>
              <Link to="/performanceadmin" onClick={() => handleLinkClick('/performanceadmin')}>
                <FontAwesomeIcon icon={faChartLine} /> Performance
              </Link>
            </li> 

          </div>
        </div>
      </div>
      
    

      {/* <FontAwesomeIcon icon="fa-solid fa-bars" /> */}

    </div>
  );
};

export default AdminNavi;