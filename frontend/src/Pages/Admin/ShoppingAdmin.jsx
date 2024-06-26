import React from "react";
import AdminNavi from "./AdminNavi";
import "./ShoppingAdmin.css";

const ShoppingAdmin = () => {
  return (
    <div>
      <AdminNavi></AdminNavi>
      <div className="admin_content">
        <h1>Shoopping Page</h1>
      </div>
    </div>
  );
};

export default ShoppingAdmin;