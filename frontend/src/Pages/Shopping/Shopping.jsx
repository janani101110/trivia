import React, { useEffect, useState, useRef } from "react";
import "./Shopping.css";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "../../Component/Search/Search";
import { Shopcard } from "./Shopcard";
import { useUsers } from "../../Context/UserContext"; // Import user context
import Alert from "../../Component/Alert/Alert";
import drone from "./Assets/drone.png";
 
export const Shopping = () => {
  const shopBannerRef = useRef(null);
  const [shopposts, setShopposts] = useState([]);
  const { user } = useUsers(); // Access user data from context
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    fetch("http://localhost:5000/api/shoppost/getpost", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "shoppost");
        setShopposts(data.data); // Update shopposts state with fetched data
      });
  }, []); // Fetch shop posts only once on component mount

  // const handleCreateClick = () => {
  //   if (!user) {
  //     setShowAlert(true);
  //     setTimeout(() => {
  //       setShowAlert(false);
  //       navigate("/login");
  //     }, 2000);
  //   } else { 
  //     navigate("/shoppingpost");
  //   }
  // }; 
  const handleCreateClick = () => {
    if (!user) {
      setShowAlert(true);
    } else {
      navigate('/shoppingpost');
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    navigate('/login');
  };
  const scrollToContent = () => {
    if (shopBannerRef.current) {
      const offsetTop = shopBannerRef.current.getBoundingClientRect().top + window.scrollY;
      const additionalOffset = 300; // Adjust this value to scroll more
      window.scrollTo({ top: offsetTop + additionalOffset, behavior: 'smooth' });
    } else {
      console.log("Element 'shopbanner' ref not found."); 
    }
  };

  
  

  return (
    <div className="shopmain">
      <div className="shopup">
        <div  className="shopbanner" ref={shopBannerRef}>
          <div className="bannerimg">
            <img src={drone} alt="" />
          </div>
          <div className="bannertext">
            <p>Looking for components at low price?</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This is the place...</p>
            <button className="shopmore" onClick={scrollToContent}>Shop</button>
          </div>
        </div>
        <div className="shopsearch">
          <Search />
        </div>
        <div className="postbutton">
          <button onClick={handleCreateClick}>Create Ad</button>
          {showAlert && (
            <Alert
              message="Please login to create an advertisement."
              onClose={handleAlertClose}
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