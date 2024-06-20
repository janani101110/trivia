import React, { useState, useRef } from "react";
import "./ProjectSeeMore.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { URL } from "../../url";
import ProjectCard from "./ProjectCard";

export const ProjectSeeMore = () => {
  const { id } = useParams();
  const [projectpost, setProjectPost] = useState({});
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [page, setPage] = useState(1); // State to keep track of the current page
  const containerRef = useRef(null); // Reference to the container
  const wrapperRef = useRef(null); // Reference to the wrapper

  const fetchProPost = async () => {
    try {
      const res = await axios.get(`${URL}/api/projectposts/${id}`);
      setProjectPost(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRelatedProjects = async (page) => {
    try {
      if (projectpost.name) {
        const res = await axios.get(
          `${URL}/api/projectposts?name=${projectpost.name}&status=approved&page=${page}`
        );
        setRelatedProjects((prevProjects) => [
          ...prevProjects,
          ...res.data.filter((project) => project._id !== id),
        ]); // Append new projects to the existing list
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProPost();
  }, [id]);

  useEffect(() => {
    if (projectpost.name) {
      setRelatedProjects([]); // Reset related projects when a new project is loaded
      setPage(1); // Reset page to 1
      fetchRelatedProjects(1); // Fetch the first page of related projects
    }
  }, [projectpost.name]);

  const handleScroll = () => {
    if (
      containerRef.current.scrollLeft + containerRef.current.clientWidth >=
      containerRef.current.scrollWidth
    ) {
      setPage((prevPage) => prevPage + 1); // Load next page
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchRelatedProjects(page); // Fetch related projects for the next page
    }
  }, [page]);

   // Event handlers to pause and resume the scrolling animation
   const handleMouseEnter = () => {
    if (wrapperRef.current) {
      wrapperRef.current.classList.add("paused");
    }
  };

  const handleMouseLeave = () => {
    if (wrapperRef.current) {
      wrapperRef.current.classList.remove("paused");
    }
  };

  return (
    <div className="project_seemore_container">
      <h1 className="project_title">{projectpost.project_name}</h1>
      <hr className="project_line"></hr>
      <div className="project_inline_user">
        <div className="project_userprofile"></div>
        <div className="project_user">
          <p>Published by {projectpost.name}</p>
          <p className="project_mail">{projectpost.email}</p>
          <p>{new Date(projectpost.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(projectpost.updatedAt).toString().slice(16, 24)}</p>
        </div>
      </div>

      <div className="project_image">
        <img src={projectpost.project_photo} alt="Avatar" width={600}></img>
        <p className="project_figure">Image of the project</p>
      </div>

      <div>
        <div className="project_head">
          Components required for this project are:
        </div>
        <div className="project_describe">
          {projectpost.components}
        </div>
      </div>
      <br></br>
      <div>
        <p className="project_head">Objectives of this project:</p>
        <p className="project_describe">{projectpost.objectives}</p>
      </div>

      <br></br>

      <div className="project_image">

        {/*<video width="100%" controls autoPlay loop>
       //   <source
       //     src={projectpost.project_video}
       //     type="video/mp4"
       //   />
// </video> */}

        <Link to={projectpost.project_video} >
          click mee
        </Link>

        <p className="project_figure">Video explanation of the project</p>
      </div>

      <br></br>
      <div>
        <p className="project_head">Explanation of the project:</p>
        <p className="project_describe">{projectpost.explanation}</p>
      </div>
      <br></br>
      <div className="project_image">
        <img
          src={projectpost.circuit_diagram}
          alt="Project Image"
          width={600}
        ></img>
        <p className="project_figure">Circuit Diagram</p>
      </div>

      <div className="project_image">
        <img src={projectpost.pcb_design} alt="Project Image" width={600}></img>
        <p className="project_figure">PCB Design</p>
      </div>

      <div>
        <p className="project_head">Refer the code through this GitHub link:</p>
        <a
          className="project_github"
          href={projectpost.git_link}
          // href="https://github.com/flesler/jquery.scrollTo.git"
          target="_blank"
          rel="noopener noreferrer"
        >
          {projectpost.git_link}
        </a>
      </div>
      <br></br>
      <hr className="project_line"></hr>
      {relatedProjects.length > 0 ? (
        <div className="related_projects_section" ref={containerRef}
        onScroll={handleScroll}>
          <br></br>
          <p className="project_head">Related Projects by {projectpost.name}</p>
          <div className="related_projects_wrapper" ref={wrapperRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
          <div className="related_projects_grid">
            {relatedProjects
            .filter((project) => project.name === projectpost.name && project.approved ) // Filter by user name and approval status
            .map((project) => (
              <div className="related_project_item" key={project._id}>
                <ProjectCard projectpost={project} />
              </div>
            ))}
            </div>
          </div>
        </div>
      ):(
        <p>No related projects to see.</p>
      )}

    </div>
  );
};

export default ProjectSeeMore;
