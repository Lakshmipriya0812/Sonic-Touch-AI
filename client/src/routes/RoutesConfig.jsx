import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Clothing from "../pages/Explore/Clothing/Clothing";
import Men from "../pages/Explore/Clothing/Men";
import Women from "../pages/Explore/Clothing/Women";
import Pets from "../pages/Explore/Pets/PetSupplies";
import Dog from "../pages/Explore/Pets/Dog";
import Cat from "../pages/Explore/Pets/Cat";
import Bird from "../pages/Explore/Pets/Bird";
import Baby from "../pages/Explore/Clothing/Baby";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProductManagement from "../pages/admin/AdminProductManagement";
import SearchResults from "../pages/SearchResults";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SubsubcategoryPage from "../pages/Explore/SubsubcategoryPage";
import OrderSummary from "../pages/OrderSummary";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import CategoryLandingPage from "../pages/Explore/CategoryLandingPage";
import Teen from "../pages/Explore/Clothing/Teen";
import WishlistPage from "../pages/WishlistPage";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

const RoutesConfig = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  });

  const isAdmin = user?.isAdmin || false;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={<Login setIsAuthenticated={setIsAuthenticated} />}
      />
      <Route
        path="/signup"
        element={<Signup setIsAuthenticated={setIsAuthenticated} />}
      />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/categorylandingpage" element={<CategoryLandingPage />} />
      <Route path="/clothing" element={<Clothing />} />
      <Route path="/clothing/men" element={<Men />} />
      <Route path="/clothing/women" element={<Women />} />
      <Route path="/clothing/baby" element={<Baby />} />
      <Route path="/clothing/teen" element={<Teen />} />
      <Route path="/pets" element={<Pets />} />
      <Route path="/pets/dog" element={<Dog />} />
      <Route path="/pets/cat" element={<Cat />} />
      <Route path="/pets/bird" element={<Bird />} />
      <Route
        path="/:category/:subcategory/:subsubcategory"
        element={<SubsubcategoryPage />}
      />

      <Route path="/search" element={<SearchResults />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/order/:id" element={<OrderSummary />} />
      <Route path="/wishlist" element={<WishlistPage />} />

      <Route
        path="/admin/login"
        element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />}
      />
      <Route
        path="/admin/dashboard"
        element={
          isAdmin ? (
            <AdminDashboard setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to="/admin/login" />
          )
        }
      />
      <Route
        path="/admin/products"
        element={
          isAdmin ? <AdminProductManagement /> : <Navigate to="/admin/login" />
        }
      />
    </Routes>
  );
};

export default RoutesConfig;
