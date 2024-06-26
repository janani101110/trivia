
import React, { useEffect, useState } from 'react';
import './Forum.css';
import QuestionCard from './QuestionCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Alert from "../../Component/Alert/Alert";
import { useUsers } from "../../Context/UserContext"; // Import user context

export const Forum = () => {
  const navigate = useNavigate();
  const { user } = useUsers(); // Access user data from context
  const [showAlert, setShowAlert] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/questions');
        const sortedQuestions = res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setQuestions(sortedQuestions);
      } catch (err) {
        console.log(err);
      }
    };

    fetchQuestions();
  }, []);

  const handleClick = () => {
    if (!user) {
      setShowAlert(true);
    } else {
      navigate('/questionform');
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    navigate('/login');
  };

  // Logic to calculate pagination
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='forumBody'>
      <div className='upperbody'>
        <div className='forumtext'>Welcome to the Community!</div>
        <div className='forumButton'>
          <button onClick={handleClick}>Ask Question</button>
          {showAlert && (
            <Alert
              message="Please login to ask questions."
              onClose={handleAlertClose}
            />
          )}
        </div>
      </div>
      <div className='questionArea' style={{ width: '980px', marginLeft: '200px', marginTop: '45px' }}>
        {currentQuestions.map((question) => (
          <Link
            key={question._id}
            style={{ textDecoration: 'none' }}
            to={`/viewquestion/${question._id}`}
          >
            <QuestionCard question={question} />
          </Link>
        ))}
      </div>
      {/* Pagination controls */}
      <div className='pagination' style={{ marginLeft: '900px' }}>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className='b1'>
          Previous
        </button>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentQuestions.length < questionsPerPage} className='b2'>
          Next
        </button>
      </div>
    </div>
  );
};

export default Forum;
