import React from "react";
import "../Resources/Button.css"; // Import CSS for styling
import writeicon from "../Resources/Assets/writeicon.png"; // Import icon image

// Functional component for custom button
function Button({ label, onClick }) {
  return (
    <button className="custom-button" onClick={onClick}>
      {" "}
      {/* Button with custom styling */}
      {/* Conditionally render icon if it exists */}
      {writeicon && (
        <img src={writeicon} alt="writeicon" className="button-icon" />
      )}
      {/* Render button label */}
      {label}
    </button>
  );
}

export default Button; // Export Button component
