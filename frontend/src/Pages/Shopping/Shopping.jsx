import React, { useEffect, useState } from "react";
import "./Shopping.css";
import { Link } from "react-router-dom";
import { Search } from "../../Component/Search/Search";
import { Shopcard } from "./Shopcard";

export const Shopping = () => {
  const [shopposts, setShopposts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/getpost", {
      //get all the post in the database using GET method
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "shoppost");
        setShopposts(data.data); // show the data
      });
  }, []); //this is the fetch function to display all the shopcards

  return (
    <div className="shopmain">
      <div className="shopup">
        <div className="shopsearch">
          <Search />
        </div>

        <div className="postbutton">
          <Link to={"/Shoppingpost"}>
            <button>Create Ad</button>
          </Link>{" "}
          {/*when click on this button this will route to page where user create posts */}
        </div>
      </div>
      <div className="postsection">
        {shopposts.map(
          (
            shoppost //using the ids shop cards are shown
          ) => (
            <Link
              style={{ textDecoration: "none" }}
              to={`/productdescription/${shoppost._id}`}
            >
              <Shopcard key={shoppost._id} shoppost={shoppost} />
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Shopping;
