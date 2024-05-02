import React from "react";
import Pagination from "@mui/material/Pagination";
import "./ProjectPgNavi.css";

export const ProjectPgNavi = ({ onPageChange }) => {
  const handleChange = (event, page) => {
    onPageChange(page);
  };

  return (
    <div className="project_pagiantion">
      <Pagination count={10} color="secondary" onChange={handleChange} />
    </div>
  );
};

export default ProjectPgNavi;
