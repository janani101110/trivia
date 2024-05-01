import React from "react";
import { Link } from "react-router-dom";
import "./DropdownMenue.css";
import { useUsers } from "../../Context/UserContext";

const DropdownMenu = () => {
  const { user, fetchUsers } = useUsers();

  if (!user) {
    // Handle case where user data is not available
    return <div> User data not found! </div>;
  }

  console.log(user);

  const logout = () => {
    
    window.open("http://localhost:5000/api/auth/logout", "_self");
    localStorage.removeItem('token');
  };

  return (
    <div className="dropdown-menu">
      <ul className="dropdownMenuul">
        <div className="dropDownProfileImg">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="dropDownProfileImg"
          />
        </div>
        <div className="ProfileHeaderText">
          {user.username}
          <button className="editProfile">
          <Link style={{ textDecoration: "none" }} to="/EditProfile">
             Edit Profile
             </Link>
              </button>
        </div>

        <hr />

        <li className="dropdownMenuli">
          <Link style={{ textDecoration: "none" }} to="/MySaves">
            My Bookmarks
          </Link>
        </li>

        <li className="dropdownMenuli">
          <Link style={{ textDecoration: "none" }} to="/MyCollections">
            My Collections
          </Link>
        </li>

        <li className="dropdownMenuli">
          <Link style={{ textDecoration: "none" }} to="/MyQuestions">
            My Questions
          </Link>
        </li>

        <li className="dropdownMenuli">
          <Link style={{ textDecoration: "none" }} to="#" onClick={logout}>
            Log Out
          </Link>

        </li>
        
      </ul>
    </div>
  );
};

export default DropdownMenu;
