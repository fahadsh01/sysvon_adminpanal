// ContactsPage.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosinstance";
import { FaTrash } from "react-icons/fa";

export default function CasePage() {
  const [caseStudy, setCaseStudy] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/Case/get-case", {
        withCredentials: true,
      });
      setCaseStudy(res.data.data);
      console.log(caseStudy);
    } catch (error) {
      console.error("Error fetching casestudy request:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;

    try {
      await axiosInstance.delete(`/Case/delete-case/${id}`, {
        withCredentials: true,
      }); // Change endpoint as needed
      setCaseStudy(caseStudy.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Requested CaseStudies</h1>

      {loading ? (
        <p>Loading Requested CaseStudies ...</p>
      ) : caseStudy.length === 0 ? (
        <p>No Requested CaseStudies found.</p>
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
              {caseStudy.map((contact) => (
                <tr key={contact._id} className="hover:bg-gray-50">
                  <td className="border p-2">{contact.firstname}</td>
                  <td className="border p-2">{contact.lastname}</td>
                  <td className="border p-2">{contact.email}</td>
                  <td className="border p-2">{contact.jobtitle}</td>
                  <td className="border p-2">{contact.company}</td>
                  <td className="border p-2">{contact.slug}</td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => deleteContact(contact._id)}
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
