import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.css";
import AnimatedHeart from "react-animated-heart";
import axios from "axios";
//import ProjectSeeMore from "./ProjectSeeMore";
import { URL } from "../../url"; // Ensure this is correctly imported

export const ProjectCard = ({ projectpost, page }) => {
  // State to manage the click state and count for each project card for the current session
  const [isClick, setClick] = useState(false);
  const [likes, setLikes] = useState(projectpost.likes);

  const handleClick = async () => {
    try {
      const res = await axios.post(
        `${URL}/api/projectposts/${projectpost._id}/like`
      );
      setLikes(res.data.likes);
      setClick(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="project_inline_cards">
      <div className="project_card">
        <img
          className="project_card_image"
          src={projectpost.project_photo}
          alt="Avatar"
        />

        <div className="project_container">
          <div className="project_container_text">
            <p className="project_card_title">{projectpost.project_name}</p>
            <p className="project_description">{projectpost.intro}</p>

            <div>
              <Link
                to={`/projectseemore/${projectpost._id}`}
                
              >
                <button className="project_card__btn">Explore</button>
              </Link>
            </div>
          </div>

          
        </div>
        <div className="project_last_line">
          <div className="project_heart">
            <ul>
              <li>
                <AnimatedHeart isClick={isClick} onClick={handleClick} />{" "}
              </li>
              <br></br>
              <li>
                <p className="project_heart_line">{likes} Likes</p>
              </li>
            </ul>
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
        {/*    <div className="project_details">
            <p className="project_published_details">
              {new Date(projectpost.updatedAt).toString().slice(0, 15)}
            </p>
            <p className="project_published_details">
              {new Date(projectpost.updatedAt).toString().slice(16, 24)}
            </p>
            <p className="project_published_details">by {projectpost.name}</p>
          </div>*/}
      </div>
    </div>
  );
};

export default ProjectCard;