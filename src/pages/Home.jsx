import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = ({ isAuthenticated, handleLogout }) => {
  return (
    <div className="text-center mt-5">
      <h1>Hello, Welcome to Sonic Touch</h1>
    </div>
  );
};

export default Home;
