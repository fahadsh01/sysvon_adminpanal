import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-lg">
      {/* Logo / Brand */}
      <Link to="/" className="text-lg font-bold tracking-wide">
        My Dashboard
      </Link>

      {/* Links */}
      <div className="flex space-x-6">
        <Link to="/create-blog" className="hover:text-gray-300">
          Create Blog
        </Link>
        <Link to="/subscribers" className="hover:text-gray-300">
          Subscribers
        </Link>

        <Link to="/contacts" className="hover:text-gray-300">
          Contacts
        </Link>
        <Link
          to="/logout"
          className="bg-green-500 px-4 py-1 rounded hover:bg-green-600"
        >
          LogOut
        </Link>
      </div>
    </nav>
  );
}
