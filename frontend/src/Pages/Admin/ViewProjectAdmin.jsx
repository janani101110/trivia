import React, { useState } from "react";
import "./ViewProjectAdmin.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { URL } from "../../url";
import { useLocation } from "react-router-dom";
import AdminNavi from "./AdminNavi";

export const ViewProjectAdmin = () => {
    const { id } = useParams();
  const { state } = useLocation();
  const projectpost = state?.projectpost;
  const [projectPost, setProjectPost] = useState({});

 /* useEffect(() => {
    if (projectpost) {
      setProjectPost(projectpost);
    } else {
      fetchProjectPost();
    }
  }, [projectpost]);*/

  useEffect(() => {
    fetchProjectPost(id);
  }, [id]);

  const fetchProjectPost = async (id) => {
    try {
        const res = await axios.get(`${URL}/api/projectposts/${id}`);
     
      setProjectPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

 

  return (
    <div>
    <AdminNavi></AdminNavi>
    <div className="admin_content">
    <div className="project_seemore_container">
        
      <h1 className="project_title">{projectPost.project_name}</h1>
      <hr className="project_line"></hr>
      <div className="project_inline_user">
        <div className="project_userprofile"></div>
        <div className="project_user">
          <p>Published by {projectPost.name}</p>
          <p className="project_mail">{projectPost.email}</p>
          <p>{new Date(projectPost.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(projectPost.updatedAt).toString().slice(16, 24)}</p>
        </div>
      </div>

      <div className="project_image">
        <img src={projectPost.project_photo} alt="Avatar" width={600}></img>
        <p className="project_figure">Image of the project</p>
      </div>

      <div>
        <div className="project_head">
          Components required for this project are:
        </div>
        <div className="project_describe">
          {projectPost.components}
        </div>
      </div>
      <br></br>
      <div>
        <p className="project_head">Objectives of this project:</p>
        <p className="project_describe">{projectPost.objectives}</p>
      </div>

      <br></br>

      <div className="project_image">

        {/*<video width="100%" controls autoPlay loop>
       //   <source
       //     src={projectpost.project_video}
       //     type="video/mp4"
       //   />
// </video> */}

<Link to={projectPost.project_video} >
  click mee
</Link>

        <p className="project_figure">Video explanation of the project</p>
      </div>

      <br></br>
      <div>
        <p className="project_head">Explanation of the project:</p>
        <p className="project_describe">{projectPost.explanation}</p>
      </div>
      <br></br>
      <div className="project_image">
        <img
          src={projectPost.circuit_diagram}
          alt="Project Image"
          width={600}
        ></img>
        <p className="project_figure">Circuit Diagram</p>
      </div>

      <div className="project_image">
        <img src={projectPost.pcb_design} alt="Project Image" width={600}></img>
        <p className="project_figure">PCB Design</p>
      </div>

      <div>
        <p className="project_head">Refer the code through this GitHub link:</p>
        <a
          className="project_github"
         // href="https://github.com/flesler/jquery.scrollTo.git"
          target="_blank"
          rel="noopener noreferrer"
        >
          {projectPost.git_link}
        </a>
      </div>
      <br></br>
    </div>
    </div>
    </div>
  );
};

export default ViewProjectAdmin;
