import React from 'react'
import './Blog.css'
import PostImage from "../Blogs/images/postImage.jpg";
const Blogspost = () => {
  return (
    <div className="postCard">
            
        
            <img src={PostImage} alt="" className="postImage"/> 
      
     
            <div className="postText">
            <div className="postTitle">
                what is cloud computing
            </div>
    
            <div className="postDescription">
            Explore the latest trends in IT, from cybersecurity to AI advancements. 
            Discover how cloud computing is revolutionizing businesses and learn about 
            the potential of blockchain technology in reshaping traditional industries.
          </div>
            
        </div>
        
       </div>
  )
}

export default Blogspost
