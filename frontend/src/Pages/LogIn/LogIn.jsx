import "./LogIn.css";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext} from "react"
import axios from "axios"
import UserContext from '../../Context/UserContext';
import LoginImage from "../LogIn/images/loginImage.jpg"
import googleIcon from "../LogIn/images/googleIcon.png";

function Login() {

  const {setUser}=useContext(UserContext)
  const navigate=useNavigate()

  
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");

  }
return (
    <div className="login"> 
    <div className="logindiv"> 

        <img src={LoginImage} className="LoginImage" alt = "login" />
  
    </div>

  <div className="logindiv"> 
 

  <div className="loginTextdiv">
      <button onClick={ google } className="googleButton"> login with Google <img src={googleIcon} alt="google" className="googleIcon" /> </button>
    </div>
    <div className="loginhr">
    <hr className="hrclass" />
  </div>
  <div className="loginTextdiv"> 
        <div className="loginText"> Don't have an account? </div>
        <Link to="/signup"> <button className="loginButton"> Sign Up </button></Link>
    </div>

  </div>
   </div>

);

}
export default Login;