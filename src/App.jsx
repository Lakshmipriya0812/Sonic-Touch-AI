import React, { useState, useEffect } from "react";
import "./index.css";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import HeaderBeforeLogin from "./components/headers/HeaderBeforeLogin";
import HeaderAfterLogin from "./components/headers/HeaderAfterLogin";
import Footer from "./components/Footer";
import RoutesConfig from "./routes/RoutesConfig";
import CartProvider from "./context/CartContext";
import VoiceInput from "./components/VoiceInput";
//import ChatbotComponent from "./components/ChatbotComponent";
//import VoiceAssistant from "./components/VoiceAssistance";
import BackToTop from "./components/BackToTop";
import BackToPreviousPage from "./components/BackToPreviousPage";

function App() {
  return (
    <Router>
      <AppWithCartProvider />
    </Router>
  );
}

function AppWithCartProvider() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("token") !== null;
    setIsAuthenticated(loggedIn);
  }, []);

  return (
    <CartProvider navigate={navigate}>
      <div className="min-h-screen flex flex-col">
        {isAuthenticated ? (
          <HeaderAfterLogin setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <HeaderBeforeLogin setIsAuthenticated={setIsAuthenticated} />
        )}
        <main>
          {/* <VoiceAssistant />*/}
          {/*<ChatbotComponent />*/}
          <VoiceInput />
          <RoutesConfig setIsAuthenticated={setIsAuthenticated} />
        </main>
        <Footer />
        <BackToTop />
        <BackToPreviousPage />
      </div>
    </CartProvider>
  );
}

export default App;
