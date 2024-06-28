
import React, { useState, useEffect } from "react";
import "./shopcard.css";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import { Link } from "react-router-dom";
const ShopCard = ({ shoppost, onDelete }) => {
  const [author, setAuthor] = useState(null);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/details/${userId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const userData = await fetchUserData(shoppost.postedBy);
        setAuthor(userData);
        console.log("The author is", userData);
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };

    if (shoppost && shoppost.postedBy) {
      fetchAuthor();
    }
  }, [shoppost]);

  if (!shoppost) {
    return null;
  }

  const handleDelete = () => {
    const confirmation = window.confirm("Are you sure you want to delete the post?");
    if (confirmation) {
      onDelete(shoppost._id);
    }
  };

  return (
    
    <div className="shoppingcard"> 
    <Link
            key={shoppost._id} // Key should be placed on the outermost JSX element inside map
            style={{ textDecoration: "none" }}
            to={`/productdescription/${shoppost._id}`}
          >
      <img src={shoppost.imageUrl} alt="" /></Link>
      <div className="shopcardtext">
        <div className="shopcardtitle">{shoppost.name}</div>
        <div className="shopcardprice">{shoppost.price}</div>
         <div className="shopprofile">
        <button onClick={handleDelete} className="shop-card-delete-button" aria-label="Delete post">
          <CIcon
            icon={icon.cilTrash}
            size=""
            style={{ "--ci-primary-color": "black" }}
          />
        </button>
          {author&&(
            <div className="shopprofilepic">
              <img src={author.profilePicture} alt={author.username} className="authorProfilePicture"/>
            </div>

          )}
          
        </div>
        
      </div>
      
   
        
      
    </div>
  );
};

export default ShopCard;
