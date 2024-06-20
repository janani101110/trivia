import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProjectCard.css";
import AnimatedHeart from "react-animated-heart";
import ProjectSeeMore from "./ProjectSeeMore";

export const ProjectCard = ({ projectpost, page }) => {
  // State to manage the click state and count for each project card for the current session
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  const getLikesCount = () => (isLiked ? 1 : 0);

  return (
    <div className="project_inline_cards">
      <div className="project_card">
        <img
          className="project_card_image"
          src={projectpost.project_photo}
          alt="Avatar"
        />

        <div className="project_container">
          <p className="project_card_title">{projectpost.project_name}</p>
          <p className="project_description">{projectpost.intro}</p>

          <div>
            <Link
              to={`/projectseemore/${projectpost._id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="project_card__btn">Explore</button>
            </Link>
          </div>

          <div className="project_heart">
            <AnimatedHeart
             isClick={isLiked}
              onClick={handleClick}
                 />
            <p className="project_heart_line">
            {getLikesCount()} Likes
            </p>
          </div>

          <div className="project_details">
            <p className="project_published_details">
              {new Date(projectpost.updatedAt).toString().slice(0, 15)}
            </p>
            <p className="project_published_details">
              {new Date(projectpost.updatedAt).toString().slice(16, 24)}
            </p>
            <p className="project_published_details">by {projectpost.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
