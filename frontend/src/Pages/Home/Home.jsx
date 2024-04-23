import {useEffect,useState, React} from 'react'
import './Home.css'
import octopus from '../Home/Assets/octopus.png'
import axios from "axios";

export const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch authentication status
    const fetchAuthenticationStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/login/success', {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          }
        });

        if (response.status === 200) {
          const resObject = await response.json();
          setUser(resObject.user);
        } else {
          throw new Error("Authentication has failed");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchAuthenticationStatus();
  }, []); // Fetch authentication status on component mount

  console.log(user);


  return (  
    
    <div className='home'>
      <div className='homeimg'>
        <img src={octopus} alt=''/>
      </div>
      <div className='home-left'>
       <h1>Welcome Tinkers !</h1>
      </div>
      <div className='home-right'>
        <input type='text' className='mainsearch' placeholder='     Search your problem' />
      </div>
    </div>
    
  )
}
