import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewQuestion = () => {
  const [question, setQuestion] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/questions/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch question");
        }
        const data = await response.json();
        setQuestion(data);
      } catch (error) {
        console.error(error);
        setQuestion(null); // Reset question state in case of error
      }
    };

    fetchQuestion();
  }, [id]);

  return (
    <div>
      {question ? (
        <div className="question-container">
          <h2 className="question-title">{question.title}</h2>
          <div className="question-details">
            <p className="question-description">{question.description}</p>
            <img
              className="question-image"
              src={question.imageUrl}
              alt="Question"
            />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewQuestion;