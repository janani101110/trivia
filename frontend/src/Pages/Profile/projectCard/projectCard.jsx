import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./projectCard.css";
import AnimatedHeart from "react-animated-heart";
import axios from "axios";
//import ProjectSeeMore from "./ProjectSeeMore";
import { URL } from "../../../url"; // Ensure this is correctly imported
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";

export const ProjectCard = ({ projectpost, onDelete }) => {
  // State to manage the click state and count for each project card for the current session
  const [isClick, setClick] = useState(false);
  const [likes, setLikes] = useState(projectpost.likes);
  const [author, setAuthor] = useState(null);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/details/${userId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const userData = await fetchUserData(projectpost.postedBy);
        setAuthor(userData);
        console.log("The author is", userData);
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };

    if (projectpost && projectpost.postedBy) {
      fetchAuthor();
    }
  }, [projectpost]);

  if (!projectpost) {
    return null;
  }

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
  const handleDelete = () => {
    const confirmation = window.confirm("Are you sure you want to delete the post?");
    if (confirmation) {
      onDelete(projectpost._id);
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
              /*  target="_blank"*/
                rel="noopener noreferrer"
              >
                <button className="project_card__btn">Explore</button>
              </Link>
            </div>
          </div>

          {/*  <div className="project_heart">
            <AnimatedHeart
             isClick={isClick}
             onClick={handleClick}
                 />
            <p className="project_heart_line">
            {likes} Likes
            </p>
          </div>*/}
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
            <button onClick={handleDelete} className="shop-card-delete-button" aria-label="Delete post">
          <CIcon
            icon={icon.cilTrash}
            size=""
            style={{ "--ci-primary-color": "black" }}
          />
        </button>
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
