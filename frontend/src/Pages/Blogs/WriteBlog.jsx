import React, { useState, useEffect } from "react";
import "./Blog.css";
import { useNavigate } from "react-router-dom";
import { imageDb } from "../../firebase";
import { v4 as uuidv4 } from "uuid"; // Correct import syntax for UUID v4
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUsers } from "../../Context/UserContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const [downloadURL, setDownloadURL] = useState("");
  const [postedBy, setPostedBy] = useState(""); 
  const navigate = useNavigate();
  const { user, fetchUsers } = useUsers();

  useEffect(() => {
    if (user) {
      setPostedBy(user._id);
    }
  }, [user]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload image to Firebase storage
      const storageRef = ref(imageDb, `blogImages/${uuidv4()}`);
      await uploadBytes(storageRef, file);

      // Get download URL of uploaded image
      const url = await getDownloadURL(storageRef);
      setDownloadURL(url);

      // Prepare blog post data
      const blogPost = {
        title,
        desc,
        photo: url,
        postedBy: postedBy
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(blogPost),
      };

      // Submit blog post data to backend
      const res = await fetch(
        "http://localhost:5000/api/blogPosts/create",
        requestOptions
      );
      const data = await res.json();
      console.log(data);

      // Navigate to Blogs page after successful submission
      navigate("/Blogs");
    } catch (error) {
      console.error("Error uploading image or submitting blog post:", error);
    }
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  return (
    <div className="createBlog">
      <div className="CreateBlogInnerdiv">
        <h1 className="createBlogTitle">Create Blog Post</h1>

        <form onSubmit={handleSubmit} className="createBlogFormBody">
          <label className="createBlogTextLabel"> Title: </label>
          <br />
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter blog post title"
            className="createBlogTextbox"
            value={title}
            required
          />
          <br />
          <label className="createBlogTextLabel"> Image: </label>
          <br />
          <input
            type="file"
            onChange={(e) => handleUpload(e)}
            className="createBlogEnterImage"
            required
          />
          <br />
          {downloadURL && (
            <img src={downloadURL} alt="Uploaded" className="uploadedImage" />
          )}
          <br />
          <label className="createBlogTextLabel"> Blog Body: </label>
          <br />
          <ReactQuill
            value={desc}
            onChange={setDesc}
            className="createBlogTextArea"
            placeholder="Enter Post Description"
            required
          />
          <br />
          <button type="submit" className="createBlogSubmit">
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteBlog;