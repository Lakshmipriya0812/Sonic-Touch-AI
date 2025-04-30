import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import HeaderBeforeLogin from "../components/layout/HeaderBeforeLogin";
import HeaderAfterLogin from "../components/layout/HeaderAfterLogin";
import Footer from "../components/layout/Footer";
import RoutesConfig from "../routes/RoutesConfig";
import BackToTop from "../components/layout/BackToTop";
import BackToPreviousPage from "../components/layout/BackToPreviousPage";
import Accessibility from "../components/features/accessibility/Accessibility";
import VoiceInput from "../components/features/voice/VoiceInput";
import WishlistModal from "../components/features/wishlist/WishlistModal";

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
            Accept: "application/json",
          },
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

export default AppContent;
