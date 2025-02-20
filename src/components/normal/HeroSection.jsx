import React from "react";
import { Container } from "react-bootstrap";

const HeroSection = ({ title, image }) => {
  return (
    <div className="hero-section text-center text-white">
      <img src={image} alt={title} className="img-fluid w-100" />
      <h1 className="position-absolute top-50 start-50 translate-middle fw-bold">
        {title}
      </h1>
    </div>
  );
};

export default HeroSection;
