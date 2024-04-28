import React from "react";
import { Link } from "react-router-dom";

const Resourcepost = ({ resoPost }) => {
  return (
    <div className="res-post">
      {/* Link to navigate to the post details page */}
      <Link to={`/resopostdetails/${resoPost._id}`} key={resoPost.id}>
        {/* Container for the post image */}
        <div className="respostimg">
          <img src={resoPost.photo} alt="" className="res-post img" />
        </div>
        {/* Container for user details (username and date) */}
        <div className="resuserdetails">
          <p>@chathuabeyrathne</p>
          <p>{new Date(resoPost.createdAt).toString().slice(0, 15)}</p>
        </div>
        {/* Container for post content (title and description) */}
        <div className="respostcontent">
          <h3>{resoPost.title}</h3>
          <p>{resoPost.desc.slice(0, 200) + "...Read more"}</p>
        </div>
      </Link>
    </div>
  );
};

export default Resourcepost;
