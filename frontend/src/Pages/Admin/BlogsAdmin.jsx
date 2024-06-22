import React from "react";
import AdminNavi from "./AdminNavi";
import "./BlogsAdmin.css";

const BlogsAdmin = () => {
  return (
    <div>
      <AdminNavi></AdminNavi>
      <div className="admin_content">
        <h1>Blogs Page</h1>
      </div>
    </div>
  );
};

export default BlogsAdmin;