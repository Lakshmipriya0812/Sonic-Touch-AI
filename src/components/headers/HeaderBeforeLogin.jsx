import React, { useState } from "react";
import { Navbar, Nav, Container, Form, FormControl, Button, Modal, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Handle modal toggles
  const handleShowSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleClose = () => {
    setShowSignup(false);
    setShowLogin(false);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-white shadow-sm py-3 navbar">
        <Container fluid className="d-flex justify-content-between align-items-center">

          {/* Logo */}
          <Navbar.Brand as={Link} to="/" className="navbar-brand">
            <img src="/icon.jpg" alt="SonicTouch Logo" />
          </Navbar.Brand>

          {/* Navigation Links with Explore Dropdown */}
          <Nav className="ms-2 d-flex align-items-center">
            <Dropdown>
              <Dropdown.Toggle variant="white" className="mx-2 text-dark fw-medium border-0 shadow-none">
                Explore
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {/* Clothing Category */}
                <Dropdown.Header className="fw-bold">Clothing</Dropdown.Header>
                <Dropdown.Item as={Link} to="/clothing/women">Women</Dropdown.Item>
                <Dropdown.Item as={Link} to="/clothing/men">Men</Dropdown.Item>
                <Dropdown.Item as={Link} to="/clothing/kids">Kids</Dropdown.Item>
                <Dropdown.Item as={Link} to="/clothing/teens">Teens</Dropdown.Item>
                <Dropdown.Item as={Link} to="/clothing/toddlers">Toddlers</Dropdown.Item>
                <Dropdown.Item as={Link} to="/clothing/baby">Baby</Dropdown.Item>
                <Dropdown.Divider />

                {/* Pet Supplies Category */}
                <Dropdown.Header className="fw-bold">Pet Supplies</Dropdown.Header>
                <Dropdown.Item as={Link} to="/pets/cat">Cat</Dropdown.Item>
                <Dropdown.Item as={Link} to="/pets/dog">Dog</Dropdown.Item>
                <Dropdown.Item as={Link} to="/pets/parrots">Parrots</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link as={Link} to="/contact" className="mx-2 text-dark fw-medium">Contact</Nav.Link>
            <Nav.Link as={Link} to="/about" className="mx-2 text-dark fw-medium">About</Nav.Link>
          </Nav>

          {/* Search Bar */}
          <Form className="d-flex align-items-center border rounded px-2 mx-auto" style={{ width: "550px" }}>
            <FormControl type="search" placeholder="What are you looking for?" className="border-0 bg-light w-100" />
            <FaSearch className="ms-2 text-dark" />
          </Form>

          {/* Icons and Sign Up */}
          <div className="navbar-extra d-flex align-items-center">
            <Link to="/cart" className="text-dark mx-2 fs-5">
              <FaShoppingCart />
            </Link>
            <Button variant="primary" onClick={handleShowSignup} className="ms-3">Sign Up</Button>
          </div>
        </Container>
      </Navbar>

      {/* Sign-Up Modal */}
      <Modal show={showSignup} onHide={handleClose} centered>
        <Modal.Body className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#1e3a8a" }}>
          <div className="form-card p-4 shadow-lg bg-white rounded">
            <h3 className="text-center fw-bold mb-3">Sign Up</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Name" className="form-control-lg" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Email" className="form-control-lg" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Password" className="form-control-lg" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Confirm password" className="form-control-lg" />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 btn-lg">
                Sign Up
              </Button>
            </Form>
            <div className="text-center mt-3">
              <span>Already have an account? <a href="#" onClick={handleShowLogin} className="fw-bold text-primary">Sign In</a></span>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Login Modal */}
      <Modal show={showLogin} onHide={handleClose} centered>
        <Modal.Body className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#1e3a8a" }}>
          <div className="form-card p-4 shadow-lg bg-white rounded">
            <h3 className="text-center fw-bold mb-3">Login</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="User name" className="form-control-lg" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Password" className="form-control-lg" />
              </Form.Group>

              <div className="mb-3 text-end">
                <a href="#" className="text-decoration-none">Forgot Password?</a>
              </div>

              <Button variant="primary" type="submit" className="w-100 btn-lg">
                Login
              </Button>
            </Form>
            <div className="text-center mt-3">
              <span>Don't have an account? <a href="#" onClick={handleShowSignup} className="fw-bold text-primary">Sign Up</a></span>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </>
  );
};

export default Header;
