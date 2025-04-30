import React from "react";
import { useNavigate } from "react-router-dom";

const BackToPreviousPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={goBack}
      className="absolute top-5 left-5 p-3 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 focus:outline-none transition-all"
      aria-label="Back to previous page"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};

export default BackToPreviousPage;
