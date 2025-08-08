import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      const confirmLogout = window.confirm("Are you sure you want to log out?");

      if (!confirmLogout) {
        navigate(-1); // Go back if user cancels
        return;
      }

      try {
        await axios.post(
          "https://sysvonadminpanal.netlify.app/api/v1/users/logout",
          {},
          { withCredentials: true }
        );
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
        alert("Failed to log out. Please try again.");
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg font-semibold">Logging you out...</p>
    </div>
  );
}
