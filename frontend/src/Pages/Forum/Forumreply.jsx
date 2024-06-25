import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL } from "../../url";
import "./Forum.css";

export const Forumreply = ({ answer, fetchPostComments }) => {
  const [reply, setReply] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);

  const deleteComment = async (id) => {
    try {
      await axios.delete(`${URL}/api/answer/${id}`, {
        withCredentials: true,
      });
      fetchPostComments();
    } catch (err) {
      console.log(err);
    }
  };

  const postReply = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${URL}/api/answer/create`,
        { answer: reply, postId: answer.postId, parentId: answer._id },
        { withCredentials: true }
      );
      fetchPostComments();
      setReply("");
      setShowReplyInput(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="forum-comment">
      <div className="forum-comment-header">
        <div className="forum-com">
          <div className="forumcomuser">
            <h3>@p</h3>
          </div>
          <div className="forumcomdate">
            <p>{new Date(answer.createdAt).toString().slice(0, 15)}</p>
          </div>
        </div> 
        <div className="forum-comment-actions">
          <MdDelete onClick={() => deleteComment(answer._id)} />
          <button onClick={() => setShowReplyInput(!showReplyInput)}>Reply</button>
        </div>
      </div>
      <p>{answer.answer}</p>
      {showReplyInput && ( 
        <div className="forum-write-comment">
          <textarea
            onChange={(e) => setReply(e.target.value)}
            
            value={reply}
            placeholder="Write a reply"
            className="forumcomsection"
          />
          <button onClick={postReply}>Reply</button>
        </div>
      )}
      <div className="forum-comment-replies">
        {answer.replies && answer.replies.map(reply => (
          <Forumreply key={reply._id} answer={reply} fetchPostComments={fetchPostComments} />
        ))}
      </div>
      
    </div>
    
  );
};
