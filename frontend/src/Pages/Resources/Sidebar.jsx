import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();
  const currentCategory = new URLSearchParams(location.search).get("category");

  const getLinkClassName = (category) => {
    return currentCategory === category ? "nav active" : "nav";
  };

  return (
    <div className="sidebar">
      <table>
        <thead>
          <tr>
            <Link to="/Sensors" className={getLinkClassName(null)}>
              <th>All Categories</th>
            </Link>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Link to="/Sensors?category=Motion" className={getLinkClassName("Motion")}>
              <td>Motion Sensors</td>
            </Link>
          </tr>
          <tr>
            <Link to="/Sensors?category=Temperature" className={getLinkClassName("Temperature")}>
              <td>Temperature Sensors</td>
            </Link>
          </tr>
          <tr>
            <Link to="/Sensors?category=Light" className={getLinkClassName("Light")}>
              <td>Light Sensors</td>
            </Link>
          </tr>
          <tr>
            <Link to="/Sensors?category=Proximity" className={getLinkClassName("Proximity")}>
              <td>Proximity Sensors</td>
            </Link>
          </tr>
          <tr>
            <Link to="/Sensors?category=Gas" className={getLinkClassName("Gas")}>
              <td>Gas Sensors</td>
            </Link>
          </tr>
          <tr>
            <Link to="/Sensors?category=Sound" className={getLinkClassName("Sound")}>
              <td>Sound Sensors</td>
            </Link>
          </tr>
          <tr>
            <Link to="/Sensors?category=Image" className={getLinkClassName("Image")}>
              <td>Image Sensors/Cameras</td>
            </Link>
          </tr>
          <tr>
            <Link to="/Sensors?category=Environmental" className={getLinkClassName("Environmental")}>
              <td>Environmental Sensors</td>
            </Link>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Sidebar;
