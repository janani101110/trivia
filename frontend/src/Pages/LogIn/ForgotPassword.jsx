// Importing necessary dependencies and styles
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../Component/Assets/logo.png"
import axios from "axios";
import "./ForgotPassword.css";

// Login component definition
function ForgotPassword() {
  return (
    <div className="ForgotPasswordMainDiv">
      <div className="ForgotPasswordSecondaryDiv">
        <div className="ForgotPasswordTopicDiv">
          <img src={logo} alt="" className="logo" />
          Gavesha
        </div>
        <div className="ForgotPasswordDescription">
          Enter the Email associated with your account and we'll send you a link
          to reset your password
        </div>
        <div className="ForgotPasswordInputField">
          <input type="text" placeholder="Enter your Email" />
          <button className="ForgotPasswordButton" type="submit">
            Continue
          </button>
        </div>

        <br />
        <div className="ForgotPasswordreconfirm">
          <div className="loginText"> Dont't Have an Account? </div>
          <Link
            to="/signup"
            style={{ textDecoration: "none" }}
            className="loginLink"
          >
            {" "}
            Signup{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

// Exporting the Login component
export default ForgotPassword;
