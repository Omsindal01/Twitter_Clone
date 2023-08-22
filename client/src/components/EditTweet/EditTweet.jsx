import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditTweet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newDescription, setNewDescription] = useState("");
  const [tweet, setTweet] = useState(null);

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const response = await axios.get(`/tweets/${id}`);
        setTweet(response.data);
        setNewDescription(response.data.description);
      } catch (error) {
        console.error("Error fetching tweet:", error);
      }
    };

    fetchTweet();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/tweets/${id}`, {
        description: newDescription,
      });

      if (response.status === 200) {
        navigate(-1); // Redirect to the previous page
      }
    } catch (error) {
      console.error("Error editing tweet:", error);
    }
  };

  return (
    <div className="absolute w-full h-full top-0 left-0 bg-transparent flex items-center justify-center">
      {tweet && (
        <form className="border-b-2 pb-6" onSubmit={handleEdit}>
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="What's happening"
            maxLength={280}
            className="bg-slate-200 rounded-lg w-full p-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default EditTweet;
