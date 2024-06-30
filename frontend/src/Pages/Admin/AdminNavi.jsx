import React, { useState } from "react";
//import { useState, useEffect } from "react";
//import { ReactDOM } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faBars } from "@fortawesome/free-solid-svg-icons"
import {
  faBell,
  faHome,
  faMicrochip,
  faBook,
  faBlog,
  faCartShopping,
  faChartLine,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./AdminNavi.css";
import AdminDropdown from "./AdminDropdown";
// import { useUsers } from "../../Context/UserContext"; // Import user context

export const AdminNavi = ({
  counts = { pending: 0, approved: 0, rejected: 0 },
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  // const { user, fetchUsers } = useUsers();

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
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
              {/* <a href="#"> */}
              <FontAwesomeIcon icon={faBell} />
              {counts.pending > 0 && (
                <span className="admin_notification-count">
                  {counts.pending}
                </span>
              )}
              {/* </a> */}
            </li>
            <li
              className="dropdown" 
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon icon={faUserCircle} />

              {isDropdownVisible && <AdminDropdown />}
            </li>
          </div>
        </div>

        <div className="admin_sidebar-container">
          <div className="admin_nav-option">
            <Link to="/Admin">
            <li>
              {/* <a href="/admin" > */}
              <FontAwesomeIcon icon={faHome} /> Dashboard {/* </a>  */}
            </li></Link>

            <Link to={"/proadmin"}>
              {" "}
              <li>
                {/* <a href=""> */}
                <FontAwesomeIcon icon={faMicrochip} /> Projects {/* </a> */}
              </li>
            </Link>

            <Link to={"/Admin"}>
              {" "}
              <li>
                {/* <a href=""> */}
                <FontAwesomeIcon icon={faBook} /> Resources {/* </a> */}
              </li>
            </Link>

            <Link to={"/blogsadmin"}>
              {" "}
              <li>
                {/* <a href="#"> */}
                <FontAwesomeIcon icon={faBlog} /> Blogs {/* </a> */}
              </li>
            </Link>

            <Link to={"/shoppingsadmin"}>
              {" "}
              <li>
                {/* <a href="#"> */}
                <FontAwesomeIcon icon={faCartShopping} /> Shopping {/* </a> */}
              </li>
            </Link>

            {/*     <Link to={'/usersadmin'}> <li>
              <a href="#">
                <FontAwesomeIcon icon={faUser} /> Users{" "}
              </a>
            </li></Link> */}

            <Link to={"/performanceadmin"}>
              {" "}
              <li>
                {/* <a href="#"> */}
                <FontAwesomeIcon icon={faChartLine} /> Performance {/* </a> */}
              </li>
            </Link>
          </div>
        </div>
      </div>

      {/* <FontAwesomeIcon icon="fa-solid fa-bars" /> */}
    </div>
  );
};

export default AdminNavi;
