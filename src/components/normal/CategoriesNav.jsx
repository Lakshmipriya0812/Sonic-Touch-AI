import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const CategoriesNav = ({ categories, basePath }) => {
  return (
    <Nav className="justify-content-center my-3">
      {categories.map((category, index) => (
        <Nav.Item key={index}>
          <Nav.Link
            as={Link}
            to={`${basePath}/${category.toLowerCase()}`}
            className="mx-2 text-dark fw-bold"
          >
            {category}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default CategoriesNav;
