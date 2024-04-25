
import './App.css';
import {Navbar} from './Component/Navbar/Navbar';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import {Home} from './Pages/Home/Home';
import {Resources} from './Pages/Resources/Resources';
import {Writepost} from './Pages/Resources/Writepost';
import {Sensors} from './Pages/Resources/Sensors/Sensors';
import {MotionSen} from './Pages/Resources/Sensors/MotionSen';
import {Projects} from './Pages/Projects/Projects';
import {Blogs} from './Pages/Blogs/Blogs';
import {Shopping} from './Pages/Shopping/Shopping';
import {Forum} from './Pages/Forum/Forum';
import {AboutUs} from './Pages/AboutUs/AboutUs';
import { Footer } from './Component/Footer/Footer';
//import { Search } from './Component/Search/Search';
import {Shoppingpost} from './Pages/Shopping/Shoppingpost';
import Profile from './Pages/Profile/Profile';
import SignUp from './Pages/LogIn/SignUp';
import Login from './Pages/LogIn/LogIn';
import { UserContextProvider } from './Context/UserContext';
//import {WriteBlog} from './Pages/Blogs/WriteBlog';
//import {InsidePost} from './Pages/Blogs/InsidePost';


import {Productdescription} from './Pages/Shopping/Productdescription';




function App() {
  return (
    <div>
      <UserContextProvider>
      <BrowserRouter>
      <Navbar/>
      
      <Routes>
          <Route path='/home'element={<Home/>}/>
          <Route path='/resources'element={<Resources/>}/>
            <Route path='/writepost'element={<Writepost/>}/>
            <Route path='/sensors'element={<Sensors/>}/>
              <Route path='/MotionSen'element={<MotionSen/>}/>
           
          <Route path='/projects'element={<Projects/>}/>
          <Route path='/blogs'element={<Blogs/>}/>
          <Route path='/shopping'element={<Shopping/>}/>
          <Route path='/forum'element={<Forum/>}/>
          <Route path='/aboutus'element={<AboutUs/>}/>
          <Route path='/signup'element={<SignUp/>}/>
          <Route path='/login'element={<Login/>}/>
          <Route path='/shoppingpost' element={<Shoppingpost/>}/>
          <Route path='/productdescription/:id' element={<Productdescription/>}/>
          
          <Route path='/profile' element={<Profile/>}/>

          <Route path='/' element={<Navigate to="/home" />}/>
          
      </Routes>
      
      <Footer/>
      </BrowserRouter>
      </UserContextProvider>
      

    </div>
  );
}


export default App;
