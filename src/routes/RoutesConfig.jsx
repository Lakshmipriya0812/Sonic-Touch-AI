import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/pages/Home";
import About from "../components/pages/About";
import Contact from "../components/pages/Contact";
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

const RoutesConfig = ({ setIsAuthenticated }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.isAdmin;

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
      <Route path="/clothing" element={<Clothing />} />
      <Route path="/clothing/men" element={<Men />} />
      <Route path="/clothing/women" element={<Women />} />
      <Route path="/clothing/baby" element={<Baby />} />
      <Route path="/pets" element={<Pets />} />
      <Route path="/pets/dogs" element={<Dogs />} />
      <Route path="/pets/cats" element={<Cats />} />
      <Route path="/pets/birds" element={<Birds />} />
      <Route
        path="/:category/:subcategory/:subsubcategory"
        element={<SubsubcategoryPage />}
      />

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
      <Route path="/search" element={<SearchResults />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default RoutesConfig;
