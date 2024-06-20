import React, { useEffect } from "react";
import axios from "axios";
import { URL } from "../../url";

const PostCounts = ({ setCounts }) => {
  useEffect(() => {
    const fetchProjectPosts = async () => {
      try {
        const response = await axios.get(`${URL}/api/projectposts`);
        const posts = response.data;
        const counts = {
          pending: posts.filter(
            (post) => !post.approved && !post.rejected
          ).length,
          approved: posts.filter((post) => post.approved).length,
          rejected: posts.filter((post) => post.rejected).length,
        };
        setCounts(counts);
      } catch (error) {
        console.error("Error fetching project posts:", error);
      }
    };

    fetchProjectPosts();
  }, [setCounts]);

  return null; // This component does not render anything
};

export default PostCounts;
