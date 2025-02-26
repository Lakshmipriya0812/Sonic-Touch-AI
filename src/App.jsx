import React, { useState, useEffect } from "react";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import HeaderBeforeLogin from "./components/headers/HeaderBeforeLogin";
import HeaderAfterLogin from "./components/headers/HeaderAfterLogin";
import Footer from "./components/Footer";
import RoutesConfig from "./routes/RoutesConfig";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("token") !== null;
    setIsAuthenticated(loggedIn);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {isAuthenticated ? (
          <HeaderAfterLogin setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <HeaderBeforeLogin setIsAuthenticated={setIsAuthenticated} />
        )}
        <main>
          <RoutesConfig setIsAuthenticated={setIsAuthenticated} />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
