import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import HeaderBeforeLogin from "./components/normal/components/headers/HeaderBeforeLogin";
import HeaderAfterLogin from "./components/normal/components/headers/HeaderAfterLogin";
import Footer from "./components/normal//components/Footer";
import RoutesConfig from "./routes/RoutesConfig";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(loggedIn);
  }, []);

  return (
    <Router>
      {" "}
      {/* ✅ Router should only be here */}
      {isAuthenticated ? <HeaderAfterLogin /> : <HeaderBeforeLogin />}
      <RoutesConfig />
      <Footer />
    </Router>
  );
}

export default App;
