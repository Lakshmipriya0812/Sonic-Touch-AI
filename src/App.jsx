import React, { useState, useEffect } from "react";
import "./index.css";
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
      <div className="min-h-screen flex flex-col">
        {isAuthenticated ? <HeaderAfterLogin /> : <HeaderBeforeLogin />}
        <main className="flex-1 mt-24">
          <RoutesConfig />
        </main>{" "}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
