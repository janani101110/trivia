import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../url";
import AdminNavi from "./AdminNavi";

const ResoPostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resoPost, setResopost] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchResoPost = async () => {
    try {
      const response = await axios.get(`${URL}/api/resoposts/${id}`);
      setResopost(response.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching resource post:", error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  useEffect(() => {
    fetchResoPost();
  }, [id]);

  const handleApproval = async (approvedStatus) => {
    const confirmMessage = `Are you sure you want to ${approvedStatus ? "approve" : "reject"} this resource?`;
    const isConfirmed = window.confirm(confirmMessage);

    if (!isConfirmed) {
      return; // User clicked "Cancel", stop further execution
    }

    try {
      const url = `${URL}/api/resoposts/${approvedStatus ? 'approve' : 'reject'}/${id}`;
      await axios.put(url);
      await sendNotification(approvedStatus); // Send notification after approval
      navigate("/admin");
    } catch (err) {
      console.log(err);
    }
  };

  const sendNotification = async (approvedStatus) => {
    try {
      const notification = {
        userId: resoPost.userId, // Assuming projectPost has userId
        message: `Your resource has been ${approvedStatus ? "approved" : "rejected"}.`,
        read: false,
      };
      await axios.post(`${URL}/api/notifications`, notification);
    } catch (err) {
      console.log("Error sending notification:", err);
    }
  };

  const renderButtons = () => {
    if (!resoPost.approved && !resoPost.rejected) {
      return (
        <>
          <button type="submit" className="approved" onClick={() => handleApproval(true)}>
            Approve
          </button>
          <button type="submit" className="reject" onClick={() => handleApproval(false)}>
            Reject
          </button>
        </>
      );
    } else if (resoPost.approved) {
      return (
        <button type="submit" className="reject" onClick={() => handleApproval(false)}>
          Reject
        </button>
      );
    } else if (resoPost.rejected) {
      return (
        <button type="submit" className="approved" onClick={() => handleApproval(true)}>
          Approve
        </button>
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator
  }

  if (!resoPost) {
    return <div>Error loading resource post</div>; // Handle case where resoPost is still null
  }

  return (
    <div>
      <AdminNavi />
      <div className="resopost-detail">
        <h2>{resoPost.title}</h2>
        <p><strong>Posted By:</strong> {resoPost.postedBy.username}</p>
        <img src={resoPost.photo} alt={resoPost.title} className="resopost-image" />
        <div className="resopost-description" dangerouslySetInnerHTML={{ __html: resoPost.desc }}></div>
        <div className="resopost-actions">
          <br></br>
          <div className="button_flex">{renderButtons()}</div>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default ResoPostDetail;
