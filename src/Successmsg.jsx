import React from "react";

export const Successmsg = () => {
  return (
    <div
      className="fixed top-10 right-10 p-4 bg-green-500 text-white rounded-md shadow-lg transform transition-all duration-500 animate-slideIn"
      style={{ zIndex: 1000 }}
    >
      success!
    </div>
  );
};
