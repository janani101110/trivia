
import './App.css';

import React, { useContext } from "react";
import {Navbar} from './Component/Navbar/Navbar';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import {Home} from './Pages/Home/Home';

import {Resources} from './Pages/Resources/Resources';
import {Sensors} from './Pages/Resources/Sensors/Sensors';
import {MotionSen} from './Pages/Resources/Sensors/MotionSen';
import {Writepost} from './Pages/Resources/Writepost';
import {ResoPostdetails} from './Pages/Resources/ResoPostdetails';
import {ResoEditpost} from './Pages/Resources/ResoEditpost';

import {Projects} from './Pages/Projects/Projects';
import {Blogs} from './Pages/Blogs/Blogs';
import {Shopping} from './Pages/Shopping/Shopping';
import {Forum} from './Pages/Forum/Forum';
import {AboutUs} from './Pages/AboutUs/AboutUs';
import { Footer } from './Component/Footer/Footer';
import {Shoppingpost} from './Pages/Shopping/Shoppingpost';
import SignUp from './Pages/LogIn/SignUp';
import Login from './Pages/LogIn/LogIn';
import {WriteBlog} from './Pages/Blogs/WriteBlog';
import {InsidePost} from './Pages/Blogs/InsidePost';
import MySaves from './Pages/Profile/MySaves';
import MyCollections from "./Pages/Profile/MyCollections";
import MyQuestions from './Pages/Profile/MyQuestions'


import Productdescription from './Pages/Shopping/Productdescription';
import {UserContextProvider} from './Context/UserContext';



function App() {
  return (
    <div>
      
      <BrowserRouter>
      <UserContextProvider>
      <Navbar/>
      
      <Routes>
          <Route path='/home'element={<Home/>}/>

          <Route path='/resources'element={<Resources/>}/>
            <Route path='/sensors' element={<Sensors/>}/>
              <Route path='/motionSen' element={<MotionSen/>}/>
              <Route path='/writepost' element={<Writepost/>}/>
              <Route path='/resopostdetails/:id' element={<ResoPostdetails/>}/>
              <Route path='/resoeditpost/:id' element={<ResoEditpost/>}/>

          <Route path='/projects'element={<Projects/>}/>
          <Route path='/blogs'element={<Blogs/>}/>
          <Route path='/shopping'element={<Shopping/>}/>
          <Route path='/forum'element={<Forum/>}/>
          <Route path='/aboutus'element={<AboutUs/>}/>
          <Route path='/signup'element={<SignUp/>}/>
          <Route path='/login'element={<Login/>}/>
          <Route path='/shoppingpost' element={<Shoppingpost/>}/>
          <Route path='/WriteBlog' element={<WriteBlog/>}/>
          <Route path='/insidePost/:id' element={<InsidePost/>}/>
          <Route path='/MySaves' element={<MySaves/>}/>
          <Route path='/MyCollections' element={<MyCollections/>}/>
          <Route path='/MyQuestions' element={<MyQuestions/>}/>
          <Route path='/productdescription' element={<Productdescription/>}/>

          <Route path='/' element={<Navigate to="/home" />}/>
          
      </Routes>
      
      <Footer/>
      </UserContextProvider>
      </BrowserRouter>
      
      

    </div>
  );
}


export default App;
