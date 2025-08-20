import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosinstance";
import { FaTrash } from "react-icons/fa";

export default function CasePage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch case studies on mount
  useEffect(() => {
    const fetchData = async () => {
      await fetchCaseStudies();
    };
    fetchData();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/Case/get-case", {
        withCredentials: true,
      });
      setCaseStudies(res.data.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching case studies:", error);
      setError("Failed to load case studies.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCaseStudy = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this case study?"
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/Case/delete-case/${id}`, {
        withCredentials: true,
      });
      // Remove deleted item from state
      setCaseStudies((prev) => prev.filter((cs) => cs._id !== id));
    } catch (error) {
      console.error("Error deleting case study:", error);
      alert("Failed to delete case study. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Requested Case Studies</h1>

      {/* Error message */}
      {error && (
        <p className="text-red-600 mb-4 bg-red-100 p-2 rounded">{error}</p>
      )}

      {/* Loading state */}
      {loading ? (
        <p>Loading Requested Case Studies...</p>
      ) : caseStudies.length === 0 ? (
        <p>No Requested Case Studies found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">First Name</th>
                <th className="border p-2">Last Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Job Title</th>
                <th className="border p-2">Company</th>
                <th className="border p-2">Slug</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {caseStudies.map((contact) => (
                <tr key={contact._id} className="hover:bg-gray-50">
                  <td className="border p-2">{contact.firstname}</td>
                  <td className="border p-2">{contact.lastname}</td>
                  <td className="border p-2">{contact.email}</td>
                  <td className="border p-2">{contact.jobtitle}</td>
                  <td className="border p-2">{contact.company}</td>
                  <td className="border p-2">{contact.slug}</td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => deleteCaseStudy(contact._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
