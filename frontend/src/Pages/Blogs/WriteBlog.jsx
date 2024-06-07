import React, { useState, useEffect } from "react";
import "./Blog.css";
import { useNavigate } from "react-router-dom";
import { imageDb } from "../../firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUsers } from "../../Context/UserContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const [downloadURL, setDownloadURL] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [imageSrc, setImageSrc] = useState(null); // State to hold the selected image URL
  const [croppedImage, setCroppedImage] = useState(null);
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
    setImageSrc(URL.createObjectURL(file)); // Set imageSrc to display the preview
  };

  const handleCrop = (crop) => {
    setCrop(crop);
  };

  const handleImageLoaded = (image) => {
    // No need to set imageRef anymore
  };

  const handleCropComplete = async (crop) => {
    if (imageSrc && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(imageSrc, crop);
      setCroppedImage(croppedImageUrl);
    }
  };

  const getCroppedImg = (imageSrc, crop) => {
    const image = new Image();
    image.src = imageSrc;

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        window.URL.revokeObjectURL(croppedImage);
        const croppedImageUrl = window.URL.createObjectURL(blob);
        resolve(croppedImageUrl);
      }, "image/jpeg");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogPost = {
      title,
      desc,
      photo: croppedImage || downloadURL,
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

    try {
      const confirmation = window.confirm("Are you sure you want to Submit?");
      if (confirmation) {
        const res = await fetch(
          "http://localhost:5000/api/blogPosts/create",
          requestOptions
        );
        const data = await res.json();
        console.log(data);
        navigate("/Blogs");
      }
    } catch (err) {
      console.error(err);
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
          {imageSrc && (
            <div>
              <ReactCrop
                src={imageSrc}
                crop={crop}
                onChange={handleCrop}
                onImageLoaded={handleImageLoaded}
                onComplete={handleCropComplete}
              />
              {croppedImage && (
                <img src={croppedImage} alt="Cropped" className="croppedImage" />
              )}
            </div>
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