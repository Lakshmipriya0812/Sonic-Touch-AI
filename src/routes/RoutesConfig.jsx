import React from "react";
import { Routes, Route } from "react-router-dom"; // ✅ Only import Routes & Route
import Home from "../components/normal/pages/Home";
import About from "../components/normal/pages/About";
import Contact from "../components/normal/pages/Contact";
import Login from "../components/normal/pages/Login";
import Clothing from "../components/normal/pages/Explore/Clothing/Clothing";
import Men from "../components/normal/pages/Explore/Clothing/Men";
import Women from "../components/normal/pages/Explore/Clothing/Women";
import Kids from "../components/normal/pages/Explore/Clothing/Kids";

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
      <Route path="/clothing/kids" element={<Kids />} />
    </Routes>
  );
};

export default RoutesConfig;
