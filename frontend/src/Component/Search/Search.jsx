import React, { useState } from 'react';
import './Search.css'; // Importing the CSS file for styling
import searchIcon from '../Assets/search.jpeg'; // Importing the search icon image
import { useNavigate } from 'react-router-dom'; // Importing useNavigate from react-router-dom for navigation

export const Search = () => {
  const [prompt, setPrompt] = useState(""); // State variable to hold the search query
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="search"> {/* Container div for the search component */}
      <input
        type="text"
        className="searchBar" // CSS class for the search bar input
        placeholder="Search for more.." // Placeholder text for the search bar
        onChange={(e) => setPrompt(e.target.value)} // Function to update the search query state on input change
      />
      <img
        src={searchIcon} // Source of the search icon image
        className="searchIcon" // CSS class for the search icon
        onClick={() => navigate(prompt ? "?search=" + prompt : navigate("/sensors"))} // Function to navigate based on the search query
        alt="Search Icon" // Alt text for the search icon image
      />
    </div>
  );
};
