import React from "react";
import AdminNavi from "./AdminNavi";
import "./PerformanceAdmin.css";

const PerformanceAdmin = () => {
  return (
    <div>
      <AdminNavi></AdminNavi>
      <div className="admin_content">
        <h1>Performance Page</h1>
      </div>
    </div>
  );
};

export default PerformanceAdmin;