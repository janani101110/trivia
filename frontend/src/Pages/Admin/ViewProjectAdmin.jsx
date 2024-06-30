import React, { useState, useEffect } from "react";
import "./ViewProjectAdmin.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { URL } from "../../url";
//import { useLocation } from "react-router-dom";
import AdminNavi from "./AdminNavi";
import { useNavigate } from "react-router-dom";

export const ViewProjectAdmin = () => {
    const { id } = useParams();
 // const { state } = useLocation();
 // const projectpost = state?.projectpost;
 const [projectPost, setProjectPost] = useState({});
 const navigate = useNavigate();


  //const projectpostId = useParams().id;
 // const [projectpost, setprojectPost] = useState({});
  const fetchproPost = async () => {
    try {
      const res = await axios.get(`${URL}/api/projectposts/${id}`);
      
      setProjectPost(res.data);
    } catch (err) {
      console.log("Error fetching project post:", err);
    }
  };

  useEffect(() => {
    fetchproPost();
  }, [id]);

  const handleApproval = async (approvedStatus) => {
    const confirmMessage = `Are you sure you want to ${approvedStatus ? "approve" : "reject"} this project?`;
    const isConfirmed = window.confirm(confirmMessage);

    if (!isConfirmed) {
        return; // User clicked "Cancel", stop further execution
    }

    try {
      const url = `${URL}/api/projectposts/${approvedStatus ? 'approve' : 'reject'}/${id}`;
      await axios.put(url);
        await sendNotification(approvedStatus); // Send notification after approval
       // alert(`${approvedStatus ? "Approved" : "Rejected"} this project`);
        navigate("/Admin");
    } catch (err) {
        console.log(err);
    }
  };

  const sendNotification = async (approvedStatus) => {
    try {
      const notification = {
        userId: projectPost.userId, // Assuming projectPost has userId
        message: `Your project has been ${approvedStatus ? "approved" : "rejected"}.`,
        read: false,
      };
      await axios.post(`${URL}/api/notifications`, notification);
      
    } catch (err) {
      console.log("Error sending notification:", err);
    }
  };

 // const [posts, setPosts] = useState([]);

 /* useEffect(() => {
    if (projectpost) {
      setProjectPost(projectpost);
    } else {
      fetchProjectPost();
    }
  }, [projectpost]);*/

 /*useEffect(() => {
    fetchProjectPost(id);
  }, [id]);

  const fetchProjectPost = async (id) => {
    try {
        const res = await axios.get(`${URL}/api/projectposts/${id}`);
     
      setProjectPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };  */

  /*      


  } // Fetch posts
   useEffect(() => {
    axios
      .get("/api/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts: ", error);
      });
  }, []);

*/

const renderButtons = () => {
  if (!projectPost.approved && !projectPost.rejected) {
    return (
      <>
        <button type="submit" className="approved" onClick={() => handleApproval(true)}>
          Approve
        </button>
        <button type="submit" className="reject" onClick={() => handleApproval(false)}>
          Reject
        </button>
      </>
    );
  } else if (projectPost.approved) {
    return (
      <button type="submit" className="reject" onClick={() => handleApproval(false)}>
        Reject
      </button>
    );
  } 
    else if (projectPost.rejected) {
      return (
        <button type="submit" className="approved" onClick={() => handleApproval(true)}>
          Approve
        </button>
      );
  }
};

  return (
    <div>
    <AdminNavi />
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

   { /*  <div className="project_image">

        {/*<video width="100%" controls autoPlay loop>
       //   <source
       //     src={projectpost.project_video}
       //     type="video/mp4"
       //   />
// </video> 

<Link to={projectPost.project_video} >
  click mee
</Link>

        <p className="project_figure">Video explanation of the project</p>
      </div> */}

      <br></br>
      <div>
        <p className="project_head">Explanation of the project:</p>
        <p className="project_describe">{projectPost.explanation}</p>
      </div>
      <br></br>
     {/* <div className="project_image">
        <img
          src={projectPost.circuit_diagram}
          alt="ProjectImage"
          width={600}
        ></img>
        <p className="project_figure">Circuit Diagram</p>
      </div>

      <div className="project_image">
        <img src={projectPost.pcb_design} alt="ProjectImage" width={600}></img>
        <p className="project_figure">PCB Design</p>
      </div> */}  

      <div>
        <p className="project_head">Refer the code through this GitHub link:</p>
        <a
          className="project_github"
          href={projectPost.git_link}
         // href="https://github.com/flesler/jquery.scrollTo.git"
          target="_blank"
          rel="noopener noreferrer"
        >
          {projectPost.git_link}
        </a>
      </div>
      <br></br>
      <div className="button_flex">{renderButtons()}</div>
      <br></br>
    </div>
    </div>
    </div>
  );
};

export default ViewProjectAdmin;