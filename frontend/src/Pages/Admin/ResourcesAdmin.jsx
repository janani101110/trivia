import React from "react";
import AdminNavi from "./AdminNavi";
import "./ResourcesAdmin.css";

const ResourcesAdmin = () => {
  return (
    <div>
      <AdminNavi></AdminNavi>
      <div className="admin_content">
        <h1>Resources Page</h1>
      </div>
    </div>
  );
};

export default ResourcesAdmin;