import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row className="text-center text-md-start">
          <Col md={3} sm={6} className="mb-3">
            <h5>Contact</h5>
            <p>Email: support@sonictouch.com</p>
            <p>Phone: +1 267 261 2987</p>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <h5>FAQ</h5>
            <Link to="/faq" className="footer-link">
              Help Center
            </Link>
            <br />
            <Link to="/faq" className="footer-link">
              Shipping & Delivery
            </Link>
            <br />
            <Link to="/faq" className="footer-link">
              Returns Policy
            </Link>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <h5>Support</h5>
            <Link to="/support" className="footer-link">
              Customer Support
            </Link>
            <br />
            <Link to="/support" className="footer-link">
              Technical Help
            </Link>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <h5>Admin</h5>
            <Link to="/admin" className="footer-link">
              Admin Dashboard
            </Link>
            <br />
            <Link to="/admin/login" className="footer-link">
              Admin Login
            </Link>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} SonicTouch. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
