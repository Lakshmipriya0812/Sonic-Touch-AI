import React, { useState, useEffect } from "react";
import { FaTextHeight } from "react-icons/fa";

const Accessibility = () => {
  const [isLargeText, setIsLargeText] = useState(false);

  useEffect(() => {
    if (isLargeText) {
      document.body.classList.add("text-xl", "lg:text-2xl");
    } else {
      document.body.classList.remove("text-xl", "lg:text-2xl");
    }
  }, [isLargeText]);

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 space-y-4 z-50">
      <button
        onClick={() => setIsLargeText(!isLargeText)}
        className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition-all"
        title="Toggle Large Text"
      >
        <FaTextHeight size={24} />
      </button>
    </div>
  );
};

export default Accessibility;
