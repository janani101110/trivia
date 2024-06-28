import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { Resources } from './Pages/Resources/Resources';
import { Writepost } from './Pages/Resources/Writepost';
import { Sensors } from './Pages/Resources/Sensors/Sensors';
import { MotionSen } from './Pages/Resources/Sensors/MotionSen';
import { Projects } from './Pages/Projects/Projects';
import { Blogs } from './Pages/Blogs/Blogs';
import { Shopping } from './Pages/Shopping/Shopping';
import { Forum } from './Pages/Forum/Forum';
import { AboutUs } from './Pages/AboutUs/AboutUs';
import SignUp from './Pages/LogIn/SignUp';
import Login from './Pages/LogIn/LogIn';
import { WriteBlog } from './Pages/Blogs/WriteBlog';
import { InsidePost } from './Pages/Blogs/InsidePost';
import { UpdateBlog } from './Pages/Blogs/UpdateBlog';
import MySaves from './Pages/Profile/MySaves';
import MyCollections from "./Pages/Profile/MyCollections";
import MyQuestions from './Pages/Profile/MyQuestions';
import EditProfile from './Pages/Profile/EditProfile';
import ForgotPassword from './Pages/LogIn/ForgotPassword';
import ResetPassword from './Pages/LogIn/ResetPassword';
import AuthorPage from './Pages/Blogs/AuthorPage';
import Productdescription from './Pages/Shopping/Productdescription';
import { UserContextProvider } from './Context/UserContext';
import Admin from "./Pages/Admin/Admin";
import MainLayout from './Layouts/MainLayout';
import AdminLayout from './Layouts/AdminLayout';
import QuestionForm from "./Pages/Forum/QuestionForm";
import ViewQuestion from "./Pages/Forum/ViewQuestion";
import Shoppingpost from "./Pages/Shopping/Shoppingpost";
import Loader from "./Component/Loader/Loader";

function App() {
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // Simulating loading delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {loading ? (
        <Loader />
      ) : (
        <UserContextProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path='/home' element={<Home />} />
              <Route path='/resources' element={<Resources />} />
              <Route path='/sensors' element={<Sensors />} />
              <Route path='/MotionSen' element={<MotionSen />} />
              <Route path='/projects' element={<Projects />} />
              <Route path='/blogs' element={<Blogs />} />
              <Route path='/shopping' element={<Shopping />} />
              <Route path='/forum' element={<Forum />} />
              <Route path='/aboutus' element={<AboutUs />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
              <Route path='/shoppingpost' element={<Shoppingpost />} />
              <Route path='/WriteBlog' element={<WriteBlog />} />
              <Route path='/insidePost/:id' element={<InsidePost />} />
              <Route path='/authorpage/:id' element={<AuthorPage />} />
              <Route path='/UpdateBlog/:id' element={<UpdateBlog />} />
              <Route path='/MySaves' element={<MySaves />} />
              <Route path='/MyCollections' element={<MyCollections />} />
              <Route path='/MyQuestions' element={<MyQuestions />} />
              <Route path='/EditProfile' element={<EditProfile />} />
              <Route path='/ForgotPassword' element={<ForgotPassword />} />
              <Route path='/ResetPassword/:token' element={<ResetPassword />} />
              <Route path='/productdescription' element={<Productdescription />} />
              <Route path="/questionform" element={<QuestionForm />} />
              <Route path="/viewquestion/:id" element={<ViewQuestion />} />

              <Route path='/' element={<Navigate to="/home" />} />
            </Route>
            <Route element={<AdminLayout />}>
              <Route path='/admin' element={<Admin />} />
            </Route>
          </Routes>
        </UserContextProvider>
      )}
    </BrowserRouter>
  );
}

export default App;
