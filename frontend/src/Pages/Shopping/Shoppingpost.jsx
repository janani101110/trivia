import React, { useState, useEffect } from "react";
import "./Shoppingpost.css";
import axios from "axios";
import "firebase/storage";
import { imageDb } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../Context/UserContext";
export const Shoppingpost = () => {
  //variables
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [photoURL, setPhotoURL] = useState(null);
  const [, setPhoto] = useState(null);
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const { user, fetchUsers } = useUsers();
  const [postedBy, setPostedBy] = useState("");
  const [ userEmail,setuserEmail]=useState("");

  useEffect(() => {
    if (user) {
      setPostedBy(user._id); 
    }
  }, [user]);

  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    contact: "", 
    imageUrl: "",
    userEmail:"",
    
  });

  //function to upload photo for preview post
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoURL(URL.createObjectURL(file));
  };

  //post upload
  function handleChange(event) {
    const { name, value } = event.target;

    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  //button click
  async function handleClick(event) {
    event.preventDefault();

    const imgRef = ref(imageDb, `shoppingimages/${v4()}`);
   
    // Upload the image to Firebase Storage
    uploadBytes(imgRef, image)
      .then(() => {
        // Once the image is uploaded, get its download URL
        return getDownloadURL(imgRef);
      })
      .then((downloadURL) => {
        //  download URL to the console
        console.log("Download URL:", downloadURL);

        // Create a new shop post object
        const newShoppost = {
          name: input.name,
          description: input.description,
          price: input.price,
          contact: input.contact,
          imageUrl: downloadURL,
          userEmail: input.userEmail,
           // Add the image URL to the shop post object(firebase)
        };

        // Send the shoppost data to your backend
        return axios.post("http://localhost:5000/create", newShoppost);
      })
      .then((response) => {
        // Handle successful response from the backend if needed
        console.log("Shop post created:", response.data);
        navigate("/shopping");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error creating shop post:", error);
      });
  
 

 const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`, // Set the authorization token in headers
      },
      body: JSON.stringify(Shoppingpost), // Convert blog post object to JSON string
    };

    try {
      const res = await fetch(
        "http://localhost:5000/api/newShoppost/create",
        requestOptions
      );
      if (!res.ok) {
        throw new Error("Failed to create advertisment");
      }
      const data = await res.json();
      console.log(data);
      navigate("/shopping");
    } catch (err) {
      console.error(err);
    }
    // const res = await fetch("http://localhost:5000/api/newShoppost/create", requestOptions);
    //   if (!res.ok) {
    //     throw new Error("Failed to create advertisement");
    //   }
    //   const data = await res.json();
    //   console.log(data);
    //   navigate("/shopping");
    // } catch (error) {
    //   console.error("Error creating shop post:", error);
    // }
  };
// Function to retrieve token from local storage
const getToken = () => {
  return localStorage.getItem("token");
};


  return (
    <div className="adpost">
      <h1>Create your advertisement</h1>
      <div className="shopbody">
        <form className="shoppingform" method="post">
          <div className="restrict">
            <p>
              This website or the company will not be responsible for the
              business users do using this website. Users are strictly advised
              not to publish any advertisements that are not convenient for this
              website. Users must only add advertisements related to electronic
              and IoT topics. After selling your goods be kind enough to remove
              the advertisements.
            </p>
            <input
              type="checkbox"
              name="agree"
              id=""
              className="agree"
              required
            />{" "}
            I agree
          </div>
          <table className="shoptable">
            <tbody>
              <tr className="shoprow">
                <th>Add a photo</th>
                <td>
                  <input
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      handlePhotoChange(e);
                    }}
                    style={{ border: "none" }}
                  />
                  {/*handlePhotoChange is for the preview and this function will be called only here. then handleSubmit is on the form tag
                it is for the whole form submission. These two won't conflict each other. we can call two functions in same from. one on the
                form tag and other one inside the form*/}
                </td>
              </tr>
              <tr className="shoprow">
                <th>Component Name</th>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={(e) => {
                      setName(e.target.value);
                      handleChange(e);
                    }} //recieving data
                    placeholder=" Enter the component name with correct spellings"
                  />
                </td>
              </tr>
              <tr className="shoprow">
                <th>Price</th>
                <td>
                  <input
                    type="text"
                    name="price"
                    value={input.price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      handleChange(e);
                    }} //recieving data
                    placeholder=" Enter the price in Sri Lankan currency"
                  />
                </td>
              </tr>
              <tr className="shoprow">
                <th>Description</th>
                <td>
                  <textarea
                    name="description"
                    value={input.description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      handleChange(e);
                    }} //recieving data
                    cols={50}
                    rows={18}
                    placeholder="  Write a description about the component you wish to sell.Include all the necessary details including any constraints"
                  />
                </td>
              </tr>
              


              <tr className="shoprow">
                <th>Contact Number</th>
                <td>
                  <input
                    type="text"
                    name="contact"
                    value={input.contact}
                    onChange={(e) => {
                      setContact(e.target.value);
                      handleChange(e);
                    }} //recieving data
                    placeholder=" Enter a contact number containing 10 digits"
                  />
                </td>
              </tr>
              <tr className="shoprow">
                <th>User Email</th>
                <td>
                  <input
                    type="email"
                    name="userEmail"
                    value={input.userEmail}
                    onChange={(e) => {
                      setuserEmail(e.target.value);
                      handleChange(e);
                    }} //recieving data
                    placeholder="This email will be used for communication purpose"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <button className="shopbutton" type="submit" onClick={handleClick}>
            Add
          </button>
        </form>

        {/*-----------------preview setting------------------------------*/}

        <table className="shoptable2">
          <tbody>
            <tr className="shoppostup">
              <td className="shopphoto">
                {photoURL ? <img src={photoURL} alt="Selected" /> : ""}{" "}
                {/*assign data for given variable */}
              </td>
              <td className="shoptext">
                <tr className="comname">{name}</tr>
                {/*assign data for given variable */}

                <tr className="comprice">{price}</tr>
                {/*assign data for given variable */}
              </td>
            </tr>
            <hr style={{ color: "black" }} />
            <div className="shoppostdown">
              <tr
                className="comdesc"
                style={{ fontSize: "18px", textAlign: "justify" }}
              >
                <td>{description}</td>
                {/*assign data for given variable */}
              </tr>
              <hr style={{ color: "black" }} />
              <tr
                className="concontact"
                style={{ fontSize: "18px", color: "purple" }}
              >
                <td> Contact for more information:&nbsp; {contact}</td>
                {/*assign data for given variable */}
              </tr>
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Shoppingpost;
