import "./LogIn.css";
import React, { useState } from 'react';
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../LogIn/images/loginImage.jpg";
import googleIcon from "../LogIn/images/googleIcon.png";

const Signup=() => {

 
 
  

  



  


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
      <button onClick={google} className="googleButton"> Signup with Google <img src={googleIcon} alt="google" className="googleIcon" /> </button>
    </div>
    <div className="loginhr">
    <hr className="hrclass" />
  </div>
  <div className="loginTextdiv"> 
        <div className="loginText">  have an account? </div>
        <Link to="/login"> <button className="loginButton"> Login </button></Link>
    </div>

  </div>
   </div>


);

}
export default Signup;