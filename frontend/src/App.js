import React, { useState} from "react";

import "./App.css";
import { Navbar } from "./Component/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { Resources } from "./Pages/Resources/Resources";
import { Writepost } from "./Pages/Resources/Writepost";
import { Sensors } from "./Pages/Resources/Sensors/Sensors";
import { MotionSen } from "./Pages/Resources/Sensors/MotionSen";
import { Blogs } from "./Pages/Blogs/Blogs";
import { Shopping } from "./Pages/Shopping/Shopping";
import { Forum } from "./Pages/Forum/Forum";
import { AboutUs } from "./Pages/AboutUs/AboutUs";
import { Footer } from "./Component/Footer/Footer";

import Productdescription from "./Pages/Shopping/Productdescription";
import { Shoppingpost } from "./Pages/Shopping/Shoppingpost";
import Profile from "./Pages/Profile/Profile";
import SignUp from "./Pages/LogIn/SignUp";
import Login from "./Pages/LogIn/LogIn";
import { UserContextProvider } from "./Context/UserContext";
import { WriteBlog } from "./Pages/Blogs/WriteBlog";
import { InsidePost } from "./Pages/Blogs/InsidePost";

import Project from "./Pages/Project/Project";
import { ProjectForm } from "./Pages/Project/ProjectForm";
import { ProjectCard } from "./Pages/Project/ProjectCard";
import { ProjectSeeMore } from "./Pages/Project/ProjectSeeMore";
import { ProjectPgNavi } from "./Pages/Project/ProjectPgNavi";
import ProjectViewAll from "./Pages/Project/ProjectViewAll";

import { Admin } from "./Pages/Admin/Admin";
import BlogsAdmin from "./Pages/Admin/BlogsAdmin";
import ProjectsAdmin from "./Pages/Admin/ProjectsAdmin";
import ResourcesAdmin from "./Pages/Admin/ResourcesAdmin";
import ShoppingAdmin from "./Pages/Admin/ShoppingAdmin";
import UsersAdmin from "./Pages/Admin/UsersAdmin";
import PerformanceAdmin from "./Pages/Admin/PerformanceAdmin";
import ViewProjectAdmin from "./Pages/Admin/ViewProjectAdmin";

function App() {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div>
      <UserContextProvider>
        <Router>
          <Navbar />

          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/writepost" element={<Writepost />} />
            <Route path="/sensors" element={<Sensors />} />
            <Route path="/MotionSen" element={<MotionSen />} />

            <Route path="/projectseemore" element={<ProjectSeeMore />} />
            <Route path="/projectcard" element={<ProjectCard />} />
           { /*<Route path="/projectform" element={<ProjectForm />} />*/}
           <Route path="/projectform" element={<ProjectForm onFormSubmit={handleFormSubmit} />} />
            <Route path="/project" element={<Project />} />
            <Route path="/projectpgnavi" element={<ProjectPgNavi />} />
            {/*<Route path="/posts/post/:id" element={<ProjectSeeMore />} /> */}
            <Route path="/projectseemore" element={<ProjectSeeMore />} />
            <Route path="/projectviewall" element={<ProjectViewAll />} />

            <Route path="/admin" element={<Admin />} />
            <Route path="/blogadmin" element={<BlogsAdmin />} />
            {/*<Route path="/projectsadmin" element={<ProjectsAdmin />} />*/}
            <Route path="/projectsadmin" element={<ProjectsAdmin formData={formData} />} />
            <Route path="/projectsresources" element={<ResourcesAdmin />} />
            <Route path="/blogsadmin" element={<BlogsAdmin />} />
            <Route path="/shoppingsadmin" element={<ShoppingAdmin />} />
            <Route path="/shoppingsadmin" element={<ShoppingAdmin />} />
            <Route path="/usersadmin" element={<UsersAdmin />} />
            <Route path="/performanceadmin" element={<PerformanceAdmin />} />
            <Route path="/viewprojectadmin/:id" element={<ViewProjectAdmin />} />

            <Route path="/blogs" element={<Blogs />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/shoppingpost" element={<Shoppingpost />} />

            <Route path="/WriteBlog" element={<WriteBlog />} />
            <Route path="/InsidePost" element={<InsidePost />} />

            <Route
              path="/productdescription"
              element={<Productdescription />}
            />
            <Route path="/profile" element={<Profile />} />

            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>

          <Footer />
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
