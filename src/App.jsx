import "./App.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import BlogCreate from "./CreateBlog";
import SubscribersPage from "./SubscribersPage";
import ContactsPage from "./ContactsPage";
import LoginPage from "./LoginPage";
import ManageBlogs from "./ManageBlogs";
import Logout from "./Logout";
import Case from "./CaseStudy";
export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/subscribers" element={<SubscribersPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-blog" element={<BlogCreate />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/case-studies" element={<Case />} />
          <Route path="/" element={<ManageBlogs />} />
        </Routes>
      </div>
    </Router>
  );
}
