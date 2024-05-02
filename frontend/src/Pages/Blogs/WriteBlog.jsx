import React from 'react';
import "./Blog.css";
export const WriteBlog = () => {
    return (
    <div className="createBlog"> 
   <div className="CreateBlogTextdiv">
  </div>
  <div className="CreateBlogTextdiv"> 
  <h1 className='createBlogTitle'>Create a Blog Post</h1>
        <form className='createBlogFormBody'>
          <input type="text" placeholder='Enter post title' className='createBlogTextbox'/>
          <br/>
          <input type="file"  className='createBlogEnterImage'/>
          <br/>
          <textarea rows={30} cols={30} className='createBlogTextArea' placeholder='Enter post body'/>
          <br/>
          <button  className='createBlogSubmit'>Create</button>
        </form>
    </div>

  </div>


);

}
//onClick={handleCreate}
export default WriteBlog;
