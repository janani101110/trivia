import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './Component/Navbar/Navbar';
import { Home } from './Pages/Home/Home';
import { Resources } from './Pages/Resources/Resources';
import { Writepost } from './Pages/Resources/Writepost';
import { Sensors } from './Pages/Resources/Sensors/Sensors';
import { MotionSen } from './Pages/Resources/Sensors/MotionSen';
import { Projects } from './Pages/Projects/Projects';
import { Blogs } from './Pages/Blogs/Blogs';
import { Shopping } from './Pages/Shopping/Shopping';
import { Forum } from './Pages/Forum/Forum';
import { Footer } from './Component/Footer/Footer';
import { Shoppingpost } from './Pages/Shopping/Shoppingpost';
import SignUp from './Pages/LogIn/SignUp';
import Login from './Pages/LogIn/LogIn';
import { UserContextProvider } from './Context/UserContext';
import { WriteBlog } from './Pages/Blogs/WriteBlog';
import { InsidePost } from './Pages/Blogs/InsidePost';
import MySaves from './Pages/Profile/MySaves';
import MyCollections from './Pages/Profile/MyCollections';
import MyQuestions from './Pages/Profile/MyQuestions';
import { Productdescription } from './Pages/Shopping/Productdescription';
import Loader from './Component/Loader/Loader';

const AppWithLoader = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 3000); // Adjust the timeout as needed
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div>
      {loading && <Loader />}
      {!loading && (
        <>
          <Navbar />
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/resources' element={<Resources />} />
            <Route path='/writepost' element={<Writepost />} />
            <Route path='/sensors' element={<Sensors />} />
            <Route path='/MotionSen' element={<MotionSen />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/shopping' element={<Shopping />} />
            <Route path='/forum' element={<Forum />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/shoppingpost' element={<Shoppingpost />} />
            <Route path='/productdescription/:id' element={<Productdescription />} />
            <Route path='/MySaves' element={<MySaves />} />
            <Route path='/MyCollections' element={<MyCollections />} />
            <Route path='/MyQuestions' element={<MyQuestions />} />
            <Route path='/WriteBlog' element={<WriteBlog />} />
            <Route path='/insidePost/:id' element={<InsidePost />} />
            <Route path='/' element={<Navigate to="/home" />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <UserContextProvider>
      <AppWithLoader />
    </UserContextProvider>
  </BrowserRouter>
);

export default App;
