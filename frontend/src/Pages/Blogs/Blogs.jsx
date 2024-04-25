import React from 'react'
import "./Blog.css";
import {Link} from "react-router-dom";

 
import { Search } from "../../Component/Search/Search";
import Blogspost from './Blogspost';
export const Blogs = () => {
  return (
    <div className="Blog">
            <div className='blog-post'>
                <h1 className = "blogTitle"> TRIVIA BLOGS </h1>
                <Search />
            </div>
            <div className = "create">
                <Link to = "/WriteBlog" className = "createLink"> Create </Link>
            </div>
            <div className='bpost'>
             <Link to="/InsidePost" classname="blogcard"> <Blogspost/> </Link>
              <Blogspost/>

              <Blogspost/>

              <Blogspost/>

              <Blogspost/>
              <Blogspost/>

              <Blogspost/>

            </div>


    </div>
  ) 
}

export default Blogs;
