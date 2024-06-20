import React, { useEffect, useState } from "react";
import "./Shopping.css";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "../../Component/Search/Search";
import { Shopcard } from "./Shopcard";
import { useUsers } from "../../Context/UserContext"; // Import user context
import Alert from "../../Component/Alert/Alert";


export const Shopping = () => {
  const [shopposts, setShopposts] = useState([]);
  const { user } = useUsers(); // Access user data from context
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/getpost", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "shoppost");
        setShopposts(data.data); // Update shopposts state with fetched data
      });
  }, []); // Fetch shop posts only once on component mount

  const handleCreateClick = () => {
    if (!user) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate("/login");
      }, 2000);
    } else {
      navigate("/shoppingpost");
    }
  };

  return (
    <div className="shopmain">
      <div className="shopup">
        <div className="shopsearch">
          <Search />
        </div>
        <div className="postbutton">
          <button onClick={handleCreateClick}>Create Ad</button>
          {showAlert && (
            <Alert
              message="Please login to create an advertisement."
              onClose={() => setShowAlert(false)}
            />
          )}
        </div>
      </div>
      
      <div className="postsection">
        {shopposts.map((shoppost) => (
          <Link
            key={shoppost._id} // Key should be placed on the outermost JSX element inside map
            style={{ textDecoration: "none" }}
            to={`/productdescription/${shoppost._id}`}
          >
            <Shopcard shoppost={shoppost} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Shopping;