import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import DropdownMenu from "./DropdownMenu";



export const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [user, setUser] = useState(null);
  const navigation = useNavigate();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };


  // function gotoProfile() {
  //   navigation.navigate("/Profile", { user: user });
  // }

  useEffect(() => {
    // Fetch authentication status
    const fetchAuthenticationStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/login/success', {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          }
        });

        if (response.status === 200) {
          const resObject = await response.json();
          setUser(resObject.user);
        } else {
          throw new Error("Authentication has failed");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchAuthenticationStatus();
  }, []); // Fetch authentication status on component mount

  console.log(user);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" className="logo" />

        <h1>Gavesha</h1>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("home");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/home">
            Home
          </Link>
          {menu === "home" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("resources");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/resources">
            Resources
          </Link>
          {menu === "resources" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("projects");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/projects">
            Projects
          </Link>
          {menu === "projects" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("blogs");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/blogs">
            Blogs
          </Link>
          {menu === "blogs" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("shopping");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/shopping">
            Shopping
          </Link>
          {menu === "shopping" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("forum");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/forum">
            Forum
          </Link>
          {menu === "forum" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("about");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/aboutus">
            About Us
          </Link>
          {menu === "about" ? <hr /> : <></>}
        </li>
      </ul>

      {user ? (
        <div className="menu"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
            <img
              src={user.profilePicture} 
              className="profilenavImg"
              alt=""
            />
          
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

