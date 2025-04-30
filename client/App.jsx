import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import AppContent from "./wrappers/AppContent";
import DynamicScrollToTop from "./components/layout/DynamicScrollToTop";

const App = () => {
  return (
    <Router>
      <DynamicScrollToTop />
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

export default App;
