import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../../url"; // Ensure this is correctly imported
import { Forumreply } from "./Forumreply";

const ViewQuestion = () => {
  const [question, setQuestion] = useState(null);
  const { id } = useParams();
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`${URL}/api/questions/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch question");
        }
        const data = await response.json();
        setQuestion(data);
      } catch (error) {
        console.error(error);
        setQuestion(null);
      }
    };

    fetchQuestion();
  }, [id]);

  const fetchPostComments = async () => {
    try {
      const res = await fetch(`${URL}/api/answer/answer/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch post comments");
      }
      const data = await res.json();
      setAnswers(data);
    } catch (err) {
      console.log(err);
      setAnswers([]); // Set answers to empty array on error
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [id]);

  const postComment = async (e) => {
    e.preventDefault();
    if (!answer.trim()) return; // Ensure answer is not empty

    try {
      await axios.post(
        `${URL}/api/answer/create`,
        { answer, postId: id },
        { withCredentials: true } 
      ); 
      // After successful post, you can refresh comments by fetching again
      fetchPostComments(); // This function fetches comments and updates state
      setAnswer("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {question ? (
        <div className="question-container">
          <h2 className="question-title">{question.title}</h2>
          <hr />
          <div className="question-details">
            <p className="question-description">{question.description}</p>
            {question.imageUrl && (
              <img
                className="question-image"
                src={question.imageUrl}
                alt="Question"
              />
            )}
          </div>
          <div className="forum-comments-section">
            <h3>Reply:</h3>
            <div className="forum-write-comment">
              <textarea
                onChange={(e) => setAnswer(e.target.value)}
                
                value={answer}
                placeholder="Write Your Reply"
                className="forumcomsection"
              />
              <button onClick={postComment}>Reply</button>
            </div>
            <hr style={{boxShadow:"0 0 2px "}}/>
            {answers.map((answer) => (
              <Forumreply key={answer._id} answer={answer} fetchPostComments={fetchPostComments} />
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewQuestion;
