import React from "react";
import "../../firebase.js";
import "./ProjectForm.css";
import { useState } from "react";
import axios from "axios";
import { URL } from "../../url.js";
import { useNavigate } from "react-router-dom";
import { imageDb } from "../../firebase.js";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const ProjectForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project_name, setProjectName] = useState("");
  const [components, setComponents] = useState("");
  const [objectives, setObjectives] = useState("");
  const [intro, setIntro] = useState("");
  const [project_photo, setProjectPhoto] = useState(null);
  const [project_video, setProjectVideo] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [circuit_diagram, setCircuitDiagram] = useState(null);
  const [pcb_design, setPcbDesign] = useState(null);
  const [git_link, setGitLink] = useState("");

  const [inputs, setInputs] = useState({});

  const [file, setFile] = useState("");
  const [downloadURL, setDownloadURL] = useState("");

  const [userVideoLink, setUserVideoLink] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const fileRef = ref(imageDb, `projectImages/${v4()}`); // Corrected v4() usage
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    setDownloadURL(url);

    const fieldName = e.target.name;

    switch (fieldName) {
      case "project_photo":
        setProjectPhoto(url);
        break;
      case "project_video":
        setProjectVideo(url);
        break;
      case "circuit_diagram":
        setCircuitDiagram(url);
        break;
      case "pcb_design":
        setPcbDesign(url);
        break;
      default:
        break;
    }
  };

  const handleVideoLinkChange = (e) => {
    setUserVideoLink(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //automatically refresh

    setIsSubmit(true); // Set form submission status to true

    // Validate form fields
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const projectpost = {
      name,
      email,
      project_name,
      components,
      objectives,
      intro,
      project_photo: downloadURL,
      project_video: downloadURL,
      explanation,
      circuit_diagram: downloadURL,
      pcb_design: downloadURL,
      git_link,
    };

    try {
      const res = await axios.post(
        URL + "/api/projectposts/create",
        projectpost,
        { withCredentials: true }
      );
      console.log(res.data);
      alert("Your project has been submitted for approval");
      navigate("/project"); 
    } catch (err) {
      console.log(err);
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate each field and add errors if any
    if (!name?.trim()) {
      errors.name = "Name is required";
    }

    if (!email?.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email format";
    }

    if (!project_name?.trim()) {
      errors.project_name = "Project name is required";
    }

    if (!components?.trim()) {
      errors.components = "Components are required";
    }

    if (!objectives?.trim()) {
      errors.objectives = "Goal is required";
    }

    if (!intro?.trim()) {
      errors.intro = "Introduction is required";
    }

    if (!project_photo) {
      errors.project_photo = "Project photo is required";
    }

    if (!project_video && !userVideoLink?.trim()) {
      errors.project_video = "Video file is  required";
    }

    if (!explanation?.trim()) {
      errors.explanation = "Expalanation is required";
    }

    if (!circuit_diagram) {
      errors.circuit_diagram = "Circuit diagram is required";
    }

    if (!pcb_design) {
      errors.pcb_design = "PCB Design is required";
    }

    if (!git_link?.trim()) {
      errors.git_link = "GIT Link is required";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="project_container">
      <form onSubmit={handleSubmit}>
        <div className="project_form">
          <h2 className="project_topic">Fill below fields</h2>

          <div className="project_frame_box_center">
            <div className="project_fill">
              <div className="project_field">
                <label className="project_label">Name </label>
                <input className="project_input"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="name"
                  placeholder="Name"
                />
              </div>
              {formErrors.name && (
                <p className="project_error">{formErrors.name}</p>
              )}

              <div className="project_field">
                <label className="project_label">E-mail address</label>
                <input
                className="project_input"
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  name="email"
                  placeholder="E-mail"
                />
              </div>
              {formErrors.email && (
                <p className="project_error">{formErrors.email}</p>
              )}

              <div className="project_field">
                <labe className="project_label"l>Project name</labe>
                <input
                className="project_input"
                  onChange={(e) => setProjectName(e.target.value)}
                  type="text"
                  name="project_name"
                  placeholder="Project Name"
                />
              </div>
              {formErrors.project_name && (
                <p className="project_error">{formErrors.project_name}</p>
              )}

              <div className="project_field">
                <label className="project_label">Used components and libraries</label>
                <textarea
                  className="project_input"
                  onChange={(e) => setComponents(e.target.value)}
                  name="components"
                  placeholder="Components ex:ATMega32,Rain sensor"
                  cols={100}
                  rows={2}
                />
              </div>
              {formErrors.components && (
                <p className="project_error">{formErrors.components}</p>
              )}

              <div className="project_field">
                <label className="project_label">Final goal / objectives</label>
                <textarea
                  className="project_input"
                  onChange={(e) => setObjectives(e.target.value)}
                  type="text"
                  name="objectives"
                  placeholder="Objectives"
                  cols={100}
                  rows={2}
                />
              </div>
              {formErrors.objectives && (
                <p className="project_error">{formErrors.objectives}</p>
              )}

              <div className="project_field">
                <label className="project_label">Give an brief introduction about the project</label>
                <textarea
                className="project_input"
                  onChange={(e) => setIntro(e.target.value)}
                  type="text"
                  name="intro"
                  placeholder="Give a brief description about your project"
                  cols={100}
                  rows={2}
                />
              </div>
              {formErrors.intro && (
                <p className="project_error">{formErrors.intro}</p>
              )}

              <div className="project_upload">
                <label htmlFor="project_photo" className="project_label">
                  Upload a clear image of your project
                </label>
                <input
                className="project_input"
                  onChange={(e) => handleUpload(e)}
                  type="file"
                  name="project_photo"
                  accept="image/*"
                />
              </div>
              {formErrors.project_photo && (
                <p className="project_error">{formErrors.project_photo}</p>
              )}

              <div className="project_upload">
                <label htmlFor="prooject_video" className="project_label">
                  Upload the video about the project
                </label>
                <input
                className="project_input"
                  onChange={handleVideoLinkChange}
                  type="file"
                  name="project_video"
                  accept="video/*"
                />
              </div>
              {formErrors.project_video && (
                <p className="project_error">{formErrors.project_video}</p>
              )}

              <div className="project_field">
                <label className="project_label">Explain your project descriptively</label>
                <textarea
                className="project_input"
                  onChange={(e) => setExplanation(e.target.value)}
                  type="text"
                  name="explain"
                  placeholder="Give a full explanation of the project"
                  cols={100}
                  rows={4}
                />
              </div>
              {formErrors.explanation && (
                <p className="project_error">{formErrors.explanation}</p>
              )}

              <div className="project_upload">
                <label htmlFor="project_photo" className="project_label">
                  Upload the circuit/schematic diagram
                </label>
                <input
                className="project_input"
                  onChange={(e) => handleUpload(e)}
                  type="file"
                  name="circuit_diagram"
                  accept="image/*"
                />
              </div>
              {formErrors.circuit_diagram && (
                <p className="project_error">{formErrors.circuit_diagram}</p>
              )}

              <div className="project_upload">
                <label htmlFor="project_photo" className="project_label">Upload the PCB design</label>
                <input
                className="project_input"
                  onChange={(e) => handleUpload(e)}
                  type="file"
                  name="pcb_design"
                  accept="image/*"
                />
              </div>
              {formErrors.pcb_design && (
                <p className="project_error">{formErrors.pcb_design}</p>
              )}

              <div className="project_field">
                <label className="project_label">Github repository link with the source code</label>
                <input
                className="project_input"
                  onChange={(e) => setGitLink(e.target.value)}
                  type="text"
                  name="code"
                  placeholder="Put the github link to here"
                />
              </div>
              {formErrors.git_link && (
                <p className="project_error">{formErrors.git_link}</p>
              )}

              <button type="submit" className="project_form_submit">
                Submit
              </button>

              {isSubmit && Object.keys(formErrors).length > 0 && (
                <div className="project_ui_message_error">
                  Error: Please fill in all the required fields.
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;