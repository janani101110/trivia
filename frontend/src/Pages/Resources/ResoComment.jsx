import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL } from "../../url";

export const ResoComment = ({ c, fetchPostComments }) => {
  const [reply, setReply] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);

  const deleteComment = async (id) => {
    try {
      await axios.delete(`${URL}/api/resocomments/${id}`, {
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
        `${URL}/api/resocomments/create`,
        { comment: reply, postId: c.postId, parentId: c._id },
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
    <div className="reso-comment">
      <div className="reso-comment-header">
        <div className="reso-com">
          <div className="resocomuser">
            <h3>@{c.author}</h3>
          </div>
          <div className="resocomdate">
            <p>{new Date(c.createdAt).toString().slice(0, 15)}</p>
          </div>
        </div>
        <div className="reso-comment-actions">
          <MdDelete onClick={() => deleteComment(c._id)} />
          <button onClick={() => setShowReplyInput(!showReplyInput)}>Reply</button>
        </div>
      </div>
      <p>{c.comment}</p>
      {showReplyInput && (
        <div className="reso-write-comment">
          <input
            onChange={(e) => setReply(e.target.value)}
            type="text"
            value={reply}
            placeholder="Write a reply"
            className="resocomsection"
          />
          <button onClick={postReply}>Add Reply</button>
        </div>
      )}
      <div className="reso-comment-replies">
        {c.replies && c.replies.map(reply => (
          <ResoComment key={reply._id} c={reply} fetchPostComments={fetchPostComments} />
        ))}
      </div>
    </div>
  );
};