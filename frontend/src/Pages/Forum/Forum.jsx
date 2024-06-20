// Forum.jsx
import React, { useEffect, useState } from 'react';
import "./Forum.css";
import QuestionCard from './QuestionCard';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';


export const Forum = ({ question }) => {
  const navigate = useNavigate(); 

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/questions"); // Corrected API endpoint
        setQuestions(res.data.data); // Accessing data from the response
      } catch (err) {
        console.log(err);
      }
    };

    fetchQuestions();
  }, []);

  const handleClick = () => {
    navigate('/questionform'); 
  };
  

  return (
    <div className='forumBody'>
      <div className='upperbody' >
      <div className='forumButton'>
        <button onClick={handleClick}>Ask Questions</button>
      </div>
      </div>
      <div className='questionArea' style={{ width: '980px', marginLeft: '125px' }}>
        {questions.map((question) => (
          <Link
            key={question._id}
            style={{ textDecoration: "none" }}
            to={`/viewquestion/${question._id}`} // Navigate to the view question page with question ID
          >
            <QuestionCard question={question} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Forum;
