import React from "react";

const About = ({ isAuthenticated }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-center text-3xl font-bold mb-6 text-gray-900">
          About Sonic Touch
        </h1>
        <p className="text-center text-lg text-gray-600">
          {/* Add your content here */}
          What Sonic Touch is...
        </p>
      </div>
    </div>
  );
};

export default About;
