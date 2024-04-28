import React, { useState } from "react";
import { URL } from "../../url"; // Importing URL from a relative path
import axios from "axios"; // Importing Axios for making HTTP requests
import "./Writepost.css"; // Importing CSS styles for Writepost component
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from React Router DOM for navigation
import { ImCross } from "react-icons/im"; // Importing cross icon from react-icons library
import { imageDb } from "../../firebase"; // Importing imageDb from Firebase
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"; // Importing Firebase storage functions
import { v4 } from "uuid"; // Importing UUID for generating unique IDs

export const Writepost = () => {
  // State variables to manage form inputs and categories
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cats, setCats] = useState([]);
  const [cat, setCat] = useState("");
  const [file, setFile] = useState(null);

  // Hook for navigation
  const navigate = useNavigate();

  // Function to handle file input change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  // Function to delete a category from the list
  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1); // Corrected to remove one element at index i
    setCats(updatedCats);
  };

  // Function to add a category to the list
  const addCategory = () => {
    setCats([...cats, cat]);
    setCat("");
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image to Firebase Storage if file is selected
    if (file) {
      const imgRef = ref(imageDb, `resourcesimages/${v4()}`);
      try {
        await uploadBytes(imgRef, file);
        const downloadURL = await getDownloadURL(imgRef);
        console.log("Download URL:", downloadURL);

        // Prepare post data
        const resoPost = {
          title,
          desc,
          categories: cats,
          photo: downloadURL,
        };

        // Post upload
        const res = await axios.post(URL + "/api/resoposts/create", resoPost, {
          withCredentials: true,
        });
        console.log(res.data);
        navigate("/motionsen"); // Redirect after successful post creation
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("No file selected");
    }
  };

  // JSX to render the form
  return (
    <div className="container">
      <h1 className="title">Write Your Post</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter Post Title"
          className="resopostinput"
          value={title}
        />

        {/* Section for handling categories */}
        <div className="reso-post-categories-container">
          <div className="reso-category-input">
            <input
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              type="text"
              placeholder="Enter the key words"
              className="resoaddcategory"
            />
            <div onClick={addCategory} className="reso-add-button">
              Add
            </div>
          </div>

          <div className="reso-category-list">
            {/* Mapping through categories and rendering each */}
            {cats?.map((c, i) => (
              <div key={i} className="reso-category-item">
                <p>{c}</p>
                <p
                  onClick={() => deleteCategory(i)}
                  className="reso-delete-button"
                >
                  <ImCross />
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Input field for selecting file */}
        <input
          onChange={handlePhotoChange}
          type="file"
          className="file-input"
        />

        {/* Textarea for post description */}
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="description"
          placeholder="Enter Post Description"
          cols={30}
          rows={15}
        ></textarea>

        {/* Button to submit the form */}
        <button type="submit" className="publish-btn">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Writepost; // Exporting the Writepost component
