import React, { useState, useEffect } from "react";
import "./index.css";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import HeaderBeforeLogin from "./components/headers/HeaderBeforeLogin";
import HeaderAfterLogin from "./components/headers/HeaderAfterLogin";
import Footer from "./components/Footer";
import RoutesConfig from "./routes/RoutesConfig";
import CartProvider from "./context/CartContext"; // Import CartProvider

function App() {
  return (
    <Router>
      <AppWithCartProvider />{" "}
      {/* Ensure AppWithCartProvider is inside Router */}
    </Router>
  );
}

function AppWithCartProvider() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate hook here

  useEffect(() => {
    const loggedIn = localStorage.getItem("token") !== null;
    setIsAuthenticated(loggedIn);
  }, []);

  return (
    <CartProvider navigate={navigate}>
      {" "}
      {/* Pass navigate as a prop */}
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
    </CartProvider>
  );
}

export default App;
