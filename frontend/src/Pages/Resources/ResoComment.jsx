import React from "react";
import { MdDelete } from "react-icons/md"; // Import delete icon
import axios from "axios"; // Import Axios for HTTP requests

// Functional component for displaying a single resource comment
export const ResoComment = ({ c, fetchPostComments }) => {
  // Function to delete a comment
  const deleteComment = async (id) => {
    try {
      // Send DELETE request to delete the comment by its ID
      await axios.delete(`${URL}/api/resocomments/${id}`, {
        withCredentials: true,
      });
      fetchPostComments(); // Refresh comments after deletion
    } catch (err) {
      console.log(err); // Log error if deletion fails
    }
  };

  return (
    <div className="reso-comment">
      {" "}
      {/* Container for a single comment */}
      <div className="reso-comment-header">
        {" "}
        {/* Header section containing comment details */}
        <div className="reso-com">
          <div className="resocomuser">
            <h3>@chathuabeyrathna</h3>
          </div>{" "}
          {/* Username */}
          <div className="resocomdate">
            <p>{new Date(c.createdAt).toString().slice(0, 15)}</p>
          </div>{" "}
          {/* Comment creation date */}
        </div>
        <div className="reso-comment-actions">
          {" "}
          {/* Container for comment actions */}
          {/* Delete button */}
          <MdDelete onClick={() => deleteComment(c._id)} />{" "}
          {/* On click, call deleteComment function with comment ID */}
        </div>
      </div>
      <p>{c.comment}</p> {/* Display comment text */}
    </div>
  );
};
