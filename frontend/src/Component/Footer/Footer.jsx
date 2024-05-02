import React from 'react'
import './Footer.css'

import CallIcon from '../Assets/CallIcon.png'
import EmailIcon from '../Assets/EmailIcon.png'
import LocationIcon from '../Assets/LocationIcon.png'
import FacebookIcon from '../Assets/FacebookIcon.png'
import TwitterIcon from '../Assets/TwitterIcon.png'

export const Footer = () => {
  return (
    <div className="footer">
        <div className="footerIcon">
            <div className="call"> <a href="#"> <img src={CallIcon} className="callIcon" /> </a>  </div>
            <div className="email">  <a href="#"> <img src={EmailIcon} className="emailIcon" /> </a>  </div>
            <div className="location"> <a href="#"> <img src={LocationIcon}  className="locationIcon" /> </a>    </div>
            <div className="facebook">  <a href="#"> <img src={FacebookIcon} className="facebookIcon" /> </a>   </div>
            <div className="twitter">  <a href="#"> <img src={TwitterIcon} className="twitterIcon"/> </a>  </div>

        </div>
        <div className="footerText">
            COPYRIGHT &copy; 2024. ALL RIGHTS RESERVED.
            
        </div>

        <div className="footerNav"> 
           here i will put some navigation links
        </div>
    </div>
  )
}