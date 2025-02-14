// import React from "react";
// import "./App.css";
// import HeaderBeforeLogin from "./components/headers/HeaderBeforeLogin"; // Corrected Import Path
// import Footer from "./components/Footer";

// function App() {
//   return (
//     <div>
//       <HeaderBeforeLogin /> {/* Display the Header */}
//       <div>
//         <h1
//       > Welcome to Sonic TOuch      
//       </h1>
//       </div>
//       <Footer/>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HeaderBeforeLogin from "./components/headers/HeaderBeforeLogin";
import HeaderAfterLogin from "./components/headers/HeaderAfterLogin";
import Footer from "./components/Footer";
import Login from "./pages/Login";  
import Home from "./pages/Home";    

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(loggedIn);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <>
      {isAuthenticated ? <HeaderAfterLogin /> : <HeaderBeforeLogin />}
      
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} handleLogin={handleLogin} handleLogout={handleLogout} />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

