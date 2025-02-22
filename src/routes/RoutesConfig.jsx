import React from "react";
import { Routes, Route } from "react-router-dom"; // ✅ Only import Routes & Route
import Home from "../components/pages/Home";
import About from "../components/pages/About";
import Contact from "../components/pages/Contact";
import Login from "../components/pages/Login";
import Clothing from "../components/pages/Explore/Clothing/Clothing";
import Men from "../components/pages/Explore/Clothing/Men";
import Women from "../components/pages/Explore/Clothing/Women";
import Pets from "../components//pages/Explore/Pets/PetSupplies";
import Dogs from "../components/pages/Explore/Pets/Dogs";
import Cats from "../components/pages/Explore/Pets/Cats";
import Birds from "../components/pages/Explore/Pets/Birds";
import Baby from "../components/pages/Explore/Clothing/Baby";
import Footer from "../components/Footer";
import AdminLogin from "../components/pages/admin/AdminLogin";
import AdminDashboard from "../components/pages/admin/AdminDashboard";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/clothing" element={<Clothing />} />
      <Route path="/clothing/men" element={<Men />} />
      <Route path="/clothing/women" element={<Women />} />
      <Route path="/clothing/baby" element={<Baby />} />{" "}
      <Route path="/pets" element={<Pets />} />
      <Route path="/pets/dogs" element={<Dogs />} />{" "}
      <Route path="/pets/cats" element={<Cats />} />{" "}
      <Route path="/pets/birds" element={<Birds />} />{" "}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default RoutesConfig;
