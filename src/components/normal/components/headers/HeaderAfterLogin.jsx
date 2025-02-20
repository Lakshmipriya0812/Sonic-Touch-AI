import React from "react";
import { Navbar, Nav, Container, Form, FormControl, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";

const LoggedInHeader = () => {
  return (
    <Navbar expand="lg" className="bg-white shadow-sm py-3 navbar">
      <Container fluid className="d-flex justify-content-between align-items-center">
        
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          <img src="/icon.jpg" alt="SonicTouch Logo" />
        </Navbar.Brand>

        {/* Navigation Links */}
        <Nav className="ms-2 d-flex align-items-center">
          <Nav.Link as={Link} to="/" className="mx-2 text-dark fw-medium">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/about" className="mx-2 text-dark fw-medium">
            About
          </Nav.Link>
        </Nav>

        {/* Search Bar */}
        <Form className="d-flex align-items-center border rounded px-2 mx-auto" style={{ width: "300px" }}>
          <FormControl
            type="search"
            placeholder="What are you looking for?"
            className="border-0 bg-light w-100"
          />
          <FaSearch className="ms-2 text-dark" />
        </Form>

        {/* Icons & User Dropdown */}
        <div className="navbar-extra d-flex align-items-center">
          <Link to="/wishlist" className="text-dark mx-2 fs-5">
            <FaHeart />
          </Link>
          <Link to="/cart" className="text-dark mx-2 fs-5">
            <FaShoppingCart />
          </Link>

          {/* User Dropdown - FIXED */}
          <Dropdown align="end">
            <Dropdown.Toggle 
              variant="light" 
              className="border-0 bg-transparent text-dark mx-2 fs-5"
              id="userDropdown"
            >
              <FaUser />
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-custom">
              <Dropdown.Item as={Link} to="/account">My Account</Dropdown.Item>
              <Dropdown.Item as={Link} to="/orders">My Orders</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to="/logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default LoggedInHeader;
