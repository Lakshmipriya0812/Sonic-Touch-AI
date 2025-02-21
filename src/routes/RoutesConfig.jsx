import React from "react";
import { Routes, Route } from "react-router-dom"; // ✅ Only import Routes & Route
import Home from "../components/normal/pages/Home";
import About from "../components/normal/pages/About";
import Contact from "../components/normal/pages/Contact";
import Login from "../components/normal/pages/Login";
import Clothing from "../components/normal/pages/Explore/Clothing/Clothing";
import Men from "../components/normal/pages/Explore/Clothing/Men";
import Women from "../components/normal/pages/Explore/Clothing/Women";
import Pets from "../components/normal/pages/Explore/Pets/PetSupplies";
import Dogs from "../components/normal/pages/Explore/Pets/Dogs";
import Cats from "../components/normal/pages/Explore/Pets/Cats";
import Birds from "../components/normal/pages/Explore/Pets/Birds";
import Baby from "../components/normal/pages/Explore/Clothing/Baby";

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
    </Routes>
  );
};

export default RoutesConfig;
