import React, { useContext, useState } from 'react'
import './Navbar.css'
//import {FaBars} from "react-icons/fa";
import logo from '../Assets/logo.png'
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';


export const Navbar = () => {
  const [menu,setMenu] = useState("home");

  const{user}=useContext(UserContext)
  console.log(user)
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt="" className='logo'/>
            
            <h1>Gavesha</h1>
        </div>
        <ul className='nav-menu'>
            <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration: 'none'}} to='/home'>Home</Link>{menu==="home"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("resources")}}><Link style={{textDecoration: 'none'}} to='/resources'>Resources</Link>{menu==="resources"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("project")}}><Link style={{textDecoration: 'none'}} to='/project'>Projects</Link>{menu==="project"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("blogs")}}><Link style={{textDecoration: 'none'}} to='/blogs'>Blogs</Link>{menu==="blogs"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("shopping")}}><Link style={{textDecoration: 'none'}} to='/shopping'>Shopping</Link>{menu==="shopping"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("forum")}}><Link style={{textDecoration: 'none'}} to='/forum'>Forum</Link>{menu==="forum"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("about")}}><Link style={{textDecoration: 'none'}} to='/aboutus'>About Us</Link>{menu==="about"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("admin")}}><Link style={{textDecoration: 'none'}} to='/admin'>Admin</Link>{menu==="admin"?<hr/>:<></>}</li>
        </ul>'
        <div className='nav-login'>
            <Link to='/signup'><button>Sign Up</button></Link>
            <Link to='/login'><button>Sign In</button></Link>
        </div>
      
    </div>

  )
}
export default Navbar;