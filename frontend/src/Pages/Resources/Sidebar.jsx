import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <table>
        <thead>
          <tr>
            <Link to="/Sensors" className="nav">
              <th>All Categories</th>
            </Link>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Link to="/MotionSen" className="nav">
              <td>Motion Sensors</td>
            </Link>
          </tr>
          <tr>
            <Link to="/tempSen" className="nav">
              <td>Temperature Sensors</td>
            </Link>
          </tr>
          <tr>
            <Link to="/lightSen" className="nav">
              <td>Light Sensors</td>
            </Link>
          </tr>
          <tr>
            <Link to="/proxiSen" className="nav">
              <td>Proximity Sensors</td>
            </Link>
          </tr>
          <tr>
            <Link to="/gasSen" className="nav">
              <td>Gas Sensors</td>
            </Link>
          </tr>
          <tr>
            <Link to="/soundSen" className="nav">
              <td>Sound Sensors</td>
            </Link>
          </tr>
          <tr>
            <Link to="/imageSen" className="nav">
              <td>Image Sensors/Cameras</td>
            </Link>
          </tr>
          <tr>
            <Link to="/envirSen" className="nav">
              <td>Environmental Sensors</td>
            </Link>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Sidebar;
