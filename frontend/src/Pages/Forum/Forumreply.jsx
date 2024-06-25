import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL } from "../../url";
import "./Forum.css";
import { Icon } from 'react-icons-kit'; 
// import {ic_done_twotone} from 'react-icons-kit/md/ic_done_twotone'
// import {ic_done_outline_twotone} from 'react-icons-kit/md/ic_done_outline_twotone'
import {check} from 'react-icons-kit/fa/check';
import {close} from 'react-icons-kit/fa/close';
import {mailReply} from 'react-icons-kit/fa/mailReply'

export const Forumreply = ({ answer, fetchPostComments }) => {
  const [reply, setReply] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [likes, setLikes] = useState(answer.likes || 0);
  const [dislikes, setDislikes] = useState(answer.dislikes || 0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    setLikes(answer.likes);
    setDislikes(answer.dislikes);
  }, [answer.likes, answer.dislikes]);

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

  const handleLike = async () => {
    if (liked) return; // Prevent multiple likes
    try {
      const response = await axios.post(
        `${URL}/api/answer/update/${answer._id}`,
        { likes: 1, dislikes: disliked ? -1 : 0 },
        { withCredentials: true }
      );
      setLikes(response.data.likes);
      setDislikes(response.data.dislikes);
      setLiked(true);
      setDisliked(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDislike = async () => {
    if (disliked) return; // Prevent multiple dislikes
    try {
      const response = await axios.post(
        `${URL}/api/answer/update/${answer._id}`,
        { likes: liked ? -1 : 0, dislikes: 1 },
        { withCredentials: true }
      );
      setLikes(response.data.likes);
      setDislikes(response.data.dislikes);
      setLiked(false);
      setDisliked(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="forum-comment">
      <div className="forum-comment-header">
        <div className="forum-com">
          <div className="forumcomuser">
            <h3>@{answer.author || "anonymous"}</h3>
          </div>
          <div className="forumcomdate">
            <p>{new Date(answer.createdAt).toString().slice(0, 15)}</p>
          </div>
        </div>
        <div className="forum-comment-actions">
          <MdDelete onClick={() => deleteComment(answer._id)} />
          <button onClick={() => setShowReplyInput(!showReplyInput)}className="reply"><Icon icon={mailReply} /></button>
          <button onClick={handleLike} disabled={liked} className="like"><Icon icon={check} /></button> {likes}
          <button onClick={handleDislike} disabled={disliked}className="dislike"><Icon icon={close} /></button> {dislikes}
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
