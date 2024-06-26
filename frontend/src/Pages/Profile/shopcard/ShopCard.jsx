import React, { useState, useEffect } from "react";
import "./shopcard.css";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";

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
    <div className="shop-card">
      <div className="shop-card-content">
        <div className="shop-card-image">
          <img src={shoppost.imageUrl} alt={shoppost.name} />
        </div>
        <div className="shop-card-details">
          <div className="shop-card-title">{shoppost.name}</div>
          <div className="shop-card-price">{shoppost.price}</div>
          {author && (
            <div className="shop-card-author">
              <img
                src={author.profilePicture}
                alt={author.username}
                className="shop-card-author-image"
              />
              <span>{author.username}</span>
            </div>
          )}
        </div>
        <button onClick={handleDelete} className="shop-card-delete-button" aria-label="Delete post">
          <CIcon
            icon={icon.cilTrash}
            size=""
            style={{ "--ci-primary-color": "black" }}
          />
        </button>
      </div>
    </div>
  );
};

export default ShopCard;
