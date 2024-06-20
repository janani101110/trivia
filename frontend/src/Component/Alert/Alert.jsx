import React from 'react';
import './Alert.css'; // Make sure you have this file for styling

const Alert = ({ message, onClose }) => {
  return (
    <div className="alert-box">
      <div className="alert-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Alert;