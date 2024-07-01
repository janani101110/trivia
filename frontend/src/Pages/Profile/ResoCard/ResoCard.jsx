import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill"; // Import ReactQuill for rendering
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import "../../Resources/Sensors/Sensors.css";
// import { useParams} from "react-router-dom";
// import axios from "axios";

const ResoCard = ({ resoPost, onDelete }) => {
  const [author, setAuthor] = useState(null);
//   const { id: resoPostId } = useParams();
//   const navigate = useNavigate();

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/details/${userId}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const userData = await fetchUserData(resoPost.postedBy);
        setAuthor(userData); // Set author data
        console.log(userData);
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };

    fetchAuthor();
  }, [resoPost.postedBy]);


  const handleDeletePost = async () => {
    const confirmation = window.confirm("Are you sure you want to delete the post?");
    if (confirmation) {
      onDelete(resoPost._id);
    }
  };

  return (
    <div className="res-post">
      <Link to={`/resopostdetails/${resoPost._id}`}>
        <div className="respostimg">
          <img src={resoPost.photo} alt={resoPost.title} className="res-post-img" />
        </div>
        <div className="resuserdetails">
          {author && (
            <div className="authorInfo">
              <img
                src={author.profilePicture}
                alt={author.username}
                className="authorProfilePicture"
              />
              <p>{author.username}</p> {/* Display author name */}
            </div>
          )}
          <p>{new Date(resoPost.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="respostcontent">
          <h3>{resoPost.title}</h3>
          {resoPost.desc ? (
            <ReactQuill value={resoPost.desc.slice(0, 200) + "...Read more"} readOnly={true} theme="bubble" />
          ) : (
            <p>Description not available</p>
          )}
        </div>

        <div className="reso-edit-delete-wrapper">
        <Link to={`/resoeditpost/${resoPost._id}`}>
             <BiEdit
            className="reso-edit-icon"
            />
        </Link>
         
          <MdDelete
            className="reso-delete-icon"
            onClick={handleDeletePost}
          />
        </div>

      </Link>
    </div>
  );
};

export default ResoCard;