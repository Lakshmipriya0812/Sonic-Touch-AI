import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/pages/Home";
import About from "../components/pages/About";
import Contact from "../components/pages/Contact";
import Profile from "../components/pages/Profile";
import Login from "../components/pages/Login";
import Signup from "../components/pages/Signup";
import Clothing from "../components/pages/Explore/Clothing/Clothing";
import Men from "../components/pages/Explore/Clothing/Men";
import Women from "../components/pages/Explore/Clothing/Women";
import Pets from "../components/pages/Explore/Pets/PetSupplies";
import Dogs from "../components/pages/Explore/Pets/Dogs";
import Cats from "../components/pages/Explore/Pets/Cats";
import Birds from "../components/pages/Explore/Pets/Birds";
import Baby from "../components/pages/Explore/Clothing/Baby";
import AdminLogin from "../components/pages/admin/AdminLogin";
import AdminDashboard from "../components/pages/admin/AdminDashboard";
import AdminProductManagement from "../components/pages/admin/AdminProductManagement";
import SearchResults from "../components/pages/SearchResults";
import ProductDetails from "../components/pages/ProductDetails";
import Cart from "../components/pages/Cart";
import SubsubcategoryPage from "../components/pages/Explore/SubsubcategoryPage";
import OrderSummary from "../components/pages/OrderSummary";
import Checkout from "../components/pages/Checkout";
import Orders from "../components/pages/Orders";
import CategoryLandingPage from "../components/pages/Explore/CategoryLandingPage";
import Teen from "../components/pages/Explore/Clothing/Teen";

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
      <Route path="/profile" element={<Profile />} />
      <Route path="/categorylandingpage" element={<CategoryLandingPage />} />
      <Route path="/clothing" element={<Clothing />} />
      <Route path="/clothing/men" element={<Men />} />
      <Route path="/clothing/women" element={<Women />} />
      <Route path="/clothing/baby" element={<Baby />} />
      <Route path="/clothing/teen" element={<Teen />} />
      <Route path="/pets" element={<Pets />} />
      <Route path="/pets/dogs" element={<Dogs />} />
      <Route path="/pets/cats" element={<Cats />} />
      <Route path="/pets/birds" element={<Birds />} />
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
