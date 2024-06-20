
import './App.css';

import React from "react";
import {Navbar} from './Component/Navbar/Navbar';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import {Home} from './Pages/Home/Home';

import {Resources} from './Pages/Resources/Resources';
import {Sensors} from './Pages/Resources/Sensors/Sensors';
import {Pcb} from './Pages/Resources/Sensors/pcb';
import {Communi} from './Pages/Resources/Sensors/communi';
import {DataSheet} from './Pages/Resources/Sensors/dataSheet';
import {IotPlat} from './Pages/Resources/Sensors/IotPlat';
import {IotProto} from './Pages/Resources/Sensors/IotProto';
import {Micro} from './Pages/Resources/Sensors/micro';
import {Others} from './Pages/Resources/Sensors/others';
import {Writepost} from './Pages/Resources/Writepost';
import {ResoPostdetails} from './Pages/Resources/ResoPostdetails';
import {ResoEditpost} from './Pages/Resources/ResoEditpost';
import {SearchResults} from './Pages/Resources/Sensors/SearchResults';

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
            <Route path='/pcb' element={<Pcb/>}/>
            <Route path='/communi' element={<Communi/>}/>
            <Route path='/dataSheet' element={<DataSheet/>}/>
            <Route path='/IotPlat' element={<IotPlat/>}/>
            <Route path='/IotProto' element={<IotProto/>}/>
            <Route path='/micro' element={<Micro/>}/>
            <Route path='/others' element={<Others/>}/>
              <Route path='/writepost' element={<Writepost/>}/>
              <Route path='/resopostdetails/:id' element={<ResoPostdetails/>}/>
              <Route path='/resoeditpost/:id' element={<ResoEditpost/>}/>
              <Route path="/search-results" element={<SearchResults />} />

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
