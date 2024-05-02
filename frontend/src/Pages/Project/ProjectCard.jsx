import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProjectCard.css";
import AnimatedHeart from "react-animated-heart";
import ProjectSeeMore from "./ProjectSeeMore";

export const ProjectCard = ({ projectpost, page }) => {
  // State to manage the click state and count for each project card
  const [projectLikes, setProjectLikes] = useState(() => {
    // Initialize projectLikes with saved values from localStorage or an empty object
    const savedLikes = localStorage.getItem("projectLikes");
    return savedLikes ? JSON.parse(savedLikes) : {};
  });

  useEffect(() => {
    // Save projectLikes to localStorage whenever it changes
    localStorage.setItem("projectLikes", JSON.stringify(projectLikes));
  }, [projectLikes]);

  const handleClick = (projectId) => {
    setProjectLikes((prevProjectLikes) => ({
      ...prevProjectLikes,
      [projectId]: !prevProjectLikes[projectId],
    }));
  };

  const getLikesCount = (projectId) => (projectLikes[projectId] ? 1 : 0);

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
              to={`/posts/post/${projectpost._id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="project_card__btn">Explore</button>
            </Link>
          </div>

          <div className="project_heart">
            <AnimatedHeart
              isClick={projectLikes[projectpost._id]}
              onClick={() => handleClick(projectpost._id)}
            />
            <p className="project_heart_line">
              {getLikesCount(projectpost._id)} Likes
            </p>
          </div>

          <div className="project_details">
            <p className="project_published_details">
              {new Date(projectpost.updatedAt).toString().slice(0, 15)}
            </p>
            <p className="project_published_details">
              {new Date(projectpost.updatedAt).toString().slice(16, 24)}
            </p>
            <p className="project_published_details">by Eric Perera</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
