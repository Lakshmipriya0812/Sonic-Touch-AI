import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  Modal,
  Dropdown,
  InputGroup,
} from "react-bootstrap";
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
        <Container
          fluid
          className="d-flex align-items-center justify-content-between"
        >
          {/* 🔹 Right: Navigation Links */}
          <Nav className="d-flex align-items-center">
            <Dropdown>
              <Dropdown.Toggle
                variant="white"
                className="mx-3 text-dark fw-medium border-0 shadow-none"
              >
                Explore
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Header className="fw-bold">Clothing</Dropdown.Header>
                <Dropdown.Item as={Link} to="/clothing">
                  All Clothing
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/clothing/men">
                  Men
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/clothing/women">
                  Women
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/clothing/kids">
                  Kids
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Header className="fw-bold">
                  Pet Supplies
                </Dropdown.Header>
                <Dropdown.Item as={Link} to="/pets">
                  All Pet Supplies
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/pets/cat">
                  Cat
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/pets/dog">
                  Dog
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/pets/parrots">
                  Parrots
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Link
              as={Link}
              to="/about"
              className="mx-3 text-dark fw-medium"
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              className="mx-3 text-dark fw-medium"
            >
              Contact
            </Nav.Link>
          </Nav>
          {/* 🔹 Center: Logo */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="mx-auto fw-bold text-dark fs-3"
          >
            <img src="/icon.jpg" alt="SonicTouch Logo" className="logo" />
          </Navbar.Brand>

          {/* 🔹 Left: Search Bar + Cart + Sign Up */}
          <div className="d-flex align-items-center">
            {/* Search Bar */}
            <Form className="search-bar-container me-3">
              <InputGroup>
                <FormControl
                  type="search"
                  placeholder="What are you looking for?"
                  className="form-control"
                />
                <Button variant="outline-secondary">
                  <FaSearch />
                </Button>
              </InputGroup>
            </Form>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="btn btn-outline-primary rounded-circle position-relative p-2 me-3"
            >
              <FaShoppingCart className="fs-4" />
            </Link>

            {/* Sign Up Button */}
            <Button variant="primary" onClick={handleShowSignup}>
              Sign Up
            </Button>
          </div>
        </Container>
      </Navbar>

      {/* 🔹 Sign-Up Modal */}
      <Modal show={showSignup} onHide={handleClose} centered>
        <Modal.Body
          className="d-flex justify-content-center align-items-center vh-100"
          style={{ backgroundColor: "#1e3a8a" }}
        >
          <div className="form-card p-4 shadow-lg bg-white rounded">
            <h3 className="text-center fw-bold mb-3">Sign Up</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  className="form-control-lg"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  className="form-control-lg"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="form-control-lg"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  className="form-control-lg"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 btn-lg">
                Sign Up
              </Button>
            </Form>
            <div className="text-center mt-3">
              <span>
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={handleShowLogin}
                  className="fw-bold text-primary"
                >
                  Sign In
                </a>
              </span>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* 🔹 Login Modal */}
      <Modal show={showLogin} onHide={handleClose} centered>
        <Modal.Body
          className="d-flex justify-content-center align-items-center vh-100"
          style={{ backgroundColor: "#1e3a8a" }}
        >
          <div className="form-card p-4 shadow-lg bg-white rounded">
            <h3 className="text-center fw-bold mb-3">Login</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="User name"
                  className="form-control-lg"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="form-control-lg"
                />
              </Form.Group>
              <div className="mb-3 text-end">
                <a href="#" className="text-decoration-none">
                  Forgot Password?
                </a>
              </div>
              <Button variant="primary" type="submit" className="w-100 btn-lg">
                Login
              </Button>
            </Form>
            <div className="text-center mt-3">
              <span>
                Don't have an account?{" "}
                <a
                  href="#"
                  onClick={handleShowSignup}
                  className="fw-bold text-primary"
                >
                  Sign Up
                </a>
              </span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
