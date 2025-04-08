import React, { useState, useEffect } from "react";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HeaderBeforeLogin from "./components/headers/HeaderBeforeLogin";
import HeaderAfterLogin from "./components/headers/HeaderAfterLogin";
import Footer from "./components/Footer";
import RoutesConfig from "./routes/RoutesConfig";
import CartProvider from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import VoiceInput from "./components/VoiceInput";
//import ChatbotComponent from "./components/ChatbotComponent";
//import VoiceAssistant from "./components/VoiceAssistance";
import BackToTop from "./components/BackToTop";
import BackToPreviousPage from "./components/BackToPreviousPage";
import Accessibility from "./components/Accessibility";
import axios from "axios";
import { WishlistProvider } from './context/WishlistContext';
import Wishlist from './components/pages/Wishlist';
import WishlistModal from './components/WishlistModal';

const API_URL = import.meta.env.VITE_API_URL;

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          setIsAuthenticated(false);
          setUser(null);
          setIsLoading(false);
          return;
        }

        const response = await axios.get(`${API_URL}/api/auth/profile`, {
          withCredentials: true,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.data.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("user");
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setIsAuthenticated, setUser]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? <HeaderAfterLogin /> : <HeaderBeforeLogin />}
      <RoutesConfig isAuthenticated={isAuthenticated} />
      <Footer />
      <BackToTop />
      <BackToPreviousPage />
      <Accessibility />
      <VoiceInput />
      <WishlistModal />
    </>
  );
};

const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

const AppWithProviders = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default AppWithProviders;
