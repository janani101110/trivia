import React from "react";
import { Link } from "react-router-dom";
import "./DropdownMenue.css";
import { useUsers } from "../../Context/UserContext";
import MySaves from "../../Pages/Profile/MySaves";
import MyCollections from "../../Pages/Profile/MyCollections";
import MyQuestions from "../../Pages/Profile/MyQuestions";

const DropdownMenu = () => {
  const { user, fetchUsers } = useUsers();

  if (!user) {
    // Handle case where user data is not available
    return <div> User data not found! </div>;
  }

  console.log(user);

  const logout = () => {
    window.open("http://localhost:5000/api/auth/logout", "_self");
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
          <button className="editProfile"> Edit Profile </button>
        </div>

        <hr />

        <li className="dropdownMenuli">
          <Link style={{ textDecoration: "none" }} to="/MySaves">
            My Saves
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
