

import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile">

            <div className="profile-header">
                <div className="profile-header-info">
                </div>
                <img src="https://www.w3schools.com/howto/img_avatar.png" className="profile-header-img" alt="" />
                <div className="profile-header-text">
                    <h4>Username</h4>
                    <p>email</p>
                </div>
                <hr className="header-hr" />
                <div className="profile-header-text">
                    <p className="profile-header-text-p">NoBlogs</p>
                    <p className="profile-header-text-p">NoAds</p>
                    <p className="profile-header-text-p">NoProjects</p>
                    <p className="profile-header-text-p">NoResources</p>
                </div>
                <hr className="header-hr" />
                <div className="UserBlogs">
                    <div className="profile-blog-text">
                        <h3>BLOGS</h3>
                    </div>
                  

                </div>
                <div className="UserAds">

                </div>
                <div className="UserProjects">

                </div>
                <div className="UserResources">

                </div>

            </div>
        </div>

  )
}

export default Profile

