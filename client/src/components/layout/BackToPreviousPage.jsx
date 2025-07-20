import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BackToPreviousPage = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setVisible(window.history.length > 1);
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={goBack}
      aria-label="Back to previous page"
      className={`fixed top-24 left-8 z-50 p-3 bg-white/70 backdrop-blur-md rounded-full shadow-xl border border-gray-200 transition-all duration-300 hover:bg-white/90 hover:scale-110 focus:outline-none
        ${visible ? 'opacity-100 -translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-8 pointer-events-none'}`}
      style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6 text-blue-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};

export default BackToPreviousPage;
