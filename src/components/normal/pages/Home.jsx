import React from "react";

const Home = ({ isAuthenticated, handleLogout }) => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Hello, Welcome to Sonic Touch</h1>
      <h2 className="text-xl text-gray-600 mt-2">
        Here is the link for the Normal people website
      </h2>
    </div>
  );
};

export default Home;
