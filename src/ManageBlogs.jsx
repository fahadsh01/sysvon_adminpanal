import React, { useState, useEffect } from "react";
import { Loading } from "./Loading";
import { Successmsg } from "./Successmsg";
import axiosInstance from "./axiosinstance";
import { FaTrash } from "react-icons/fa";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  // Fetch Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get("/blog/get-blogs", {
          withCredentials: true,
        });
        setBlogs(res.data.data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);
  console.log(blogs);

  // Handle Delete
  const handleDelete = async (blogId, publicid) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    console.log(publicid);

    try {
      const res = await axiosInstance.delete(`/blog/delete-blog/${blogId}`, {
        data: { publicid },
        withCredentials: true,
      });
      if (res.status === 200) {
        setBlogs((prev) => prev.filter((b) => b._id !== blogId));
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);
      }
    } catch (error) {
      console.error("Error deleting blog:", error.response?.data?.message);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-8 w-full min-h-screen bg-gray-50">
      {success && <Successmsg message="Blog deleted successfully!" />}

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs available.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                  Author
                </th>
                <th className="px-6 py-3 text-center text-gray-700 font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    <img
                      src={blog.avatar || "/default.jpg"}
                      alt={blog.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{blog.title}</td>
                  <td className="px-6 py-4 text-gray-600">{blog.auther}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(blog._id, blog.publicid)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    >
                      <FaTrash size={16} />
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
};

export default ManageBlogs;
