import React, { useState, useEffect } from "react";
import "./Blog.css";
import { useNavigate } from "react-router-dom";
import { imageDb } from "../../firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUsers } from "../../Context/UserContext";

// WriteBlog component to create a new blog post
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

  // Function to handle image upload
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const imgsBlog = ref(imageDb, `blogImages/${v4()}`);
    await uploadBytes(imgsBlog, file);
    const url = await getDownloadURL(imgsBlog);
    setDownloadURL(url);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogPost = {
      title,
      desc,
      photo: downloadURL,
      postedBy: postedBy // Ensure postedBy is an ObjectId representing the user
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`, // Set the authorization token in headers
      },
      body: JSON.stringify(blogPost), // Convert blog post object to JSON string
    };

    try {
      const res = await fetch(
        "http://localhost:5000/api/blogPosts/create",
        requestOptions
      );
      if (!res.ok) {
        throw new Error("Failed to create blog post");
      }
      const data = await res.json();
      console.log(data);
      navigate("/Blogs");
    } catch (err) {
      console.error(err);
    }
  };

  // Function to retrieve token from local storage
  const getToken = () => {
    return localStorage.getItem("token");
  };

  return (
    <div className="createBlog">
      <div className="CreateBlogInnerdiv">
        <h1 className="createBlogTitle">Create a Blog Post</h1>

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
          <label className="createBlogTextLabel"> Blog Body: </label>
          <br />
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="createBlogTextArea"
            placeholder="Enter Post Description"
            cols={30}
            rows={15}
            required
          ></textarea>
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
