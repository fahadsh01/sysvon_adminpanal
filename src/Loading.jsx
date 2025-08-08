import React from "react";

export const Loading = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-50 mt-10 ml-25">
      <div className="rounded-full h-20 w-20 bg-teal-600 animate-ping"></div>
    </div>
  );
};
