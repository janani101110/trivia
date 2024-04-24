import React, { createContext, useEffect, useState,useContext } from "react";


export const UserContext = createContext(null);

export const useUsers = ()=>{
  const context =useContext(UserContext);
  if(!context){
    throw new Error("useUsers must be used within a userProvider")
  }
  return context;
}

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  
    // Fetch authentication status
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/login/success",
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
          }
        );

        if (response.status === 200) {
          const resObject = await response.json();
          setUser(resObject.user);
        } else {
          throw new Error("Authentication has failed");
        }
      } catch (err) {
        console.error("Error fetching authentication status:", err);
      }
    };
    useEffect(() => {

      fetchUsers();
  }, []); // Fetch authentication status on component mount

const value = {
  user,
  fetchUsers
}


  // Return the user context provider
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
