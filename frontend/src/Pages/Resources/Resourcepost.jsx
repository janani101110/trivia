import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Resourcepost = ({ resoPost }) => {
  // const [author, setAuthor] = useState(null);

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
        const response = await fetchUserData(resoPost.postedBy);
        const userData = await response.json();
        // setAuthor(userData); // Set author data
        console.log (userData);
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };

    fetchAuthor();
  }, [resoPost.postedBy]);

  return (
    <div className="res-post">
      <Link to={`/resopostdetails/${resoPost._id}`}>
        <div className="respostimg">
          <img src={resoPost.photo} alt={resoPost.title} className="res-post img" />
        </div>
        <div className="resuserdetails">
          <p>{resoPost.postedBy}</p>
          <p>{new Date(resoPost.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="respostcontent">
          <h3>{resoPost.title}</h3>
          <p>{resoPost.desc.slice(0, 200)}...<span>Read more</span></p>
        </div>
      </Link>
    </div>
  );
};

export default Resourcepost;
