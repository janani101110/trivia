import React, { useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import { Link} from 'react-router-dom';
import DropdownMenu from "./DropdownMenu";
import { useUsers } from "../../Context/UserContext";

export const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { user } = useUsers();  // Removed fetchUsers since it's not used
  // Removed the navigation constant since it's not used
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  console.log(user);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link style={{ textDecoration: "none" }} to="/home">
          <img src={logo} alt="" className="logo" onClick={() => {
            setMenu("home");
          }} />
        </Link>
        <Link style={{ textDecoration: "none" }} to="/home">
          <h1>Gavesha</h1>
        </Link>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("resources")}>
          <Link style={{ textDecoration: "none" }} to="/resources">Resources</Link>
          {menu === "resources" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("projects")}>
          <Link style={{ textDecoration: "none" }} to="/projects">Projects</Link>
          {menu === "projects" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("blogs")}>
          <Link style={{ textDecoration: "none" }} to="/blogs">Blogs</Link>
          {menu === "blogs" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("shopping")}>
          <Link style={{ textDecoration: "none" }} to="/shopping">Shopping</Link>
          {menu === "shopping" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("forum")}>
          <Link style={{ textDecoration: "none" }} to="/forum">Forum</Link>
          {menu === "forum" ? <hr /> : null}
        </li>
      </ul>
      {user ? (
        <div className="menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <img src={user.profilePicture} className="profilenavImg" alt="" />
          {isDropdownVisible && <DropdownMenu />}
        </div>
      ) : (
        <div className="nav-login">
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Sign In</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
