import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import axiosInstance from "./axiosinstance";

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/subscriber/get-subs", {
          withCredentials: true,
        });
        setSubscribers(res.data.data);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  const handleDelete = async (id) => {
    console.log("here is the id:", id);
    if (window.confirm("Are you sure you want to delete this subscriber?")) {
      try {
        await axiosInstance.delete(`/subscriber/delete-sub/${id}`, {
          withCredentials: true,
        });
        setSubscribers((prev) => prev.filter((sub) => sub._id !== id));
      } catch (error) {
        console.error("Error deleting subscriber:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-6">
        <h1 className="text-2xl font-bold mb-6">Subscribers List</h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : subscribers.length === 0 ? (
          <p className="text-gray-500">No subscribers found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {subscribers.map((sub) => (
              <li
                key={sub.id}
                className="flex items-center justify-between py-3"
              >
                <span className="text-gray-800">{sub.email}</span>
                <button
                  onClick={() => handleDelete(sub._id)}
                  className="text-red-500 hover:text-red-700 flex items-center gap-2"
                >
                  <FaTrash /> Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
