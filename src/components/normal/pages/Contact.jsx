import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const Contact = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-lg border-0">
            <Row className="g-0">
              {/* Left Side - Form */}
              <Col md={6} className="p-5">
                <h2 className="fw-bold mb-4">Contact Us</h2>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      className="p-3"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      className="p-3"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Phone Number"
                      className="p-3"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Message"
                      className="p-3"
                    />
                  </Form.Group>
                  <Button variant="primary" className="w-100 py-3">
                    Send Message
                  </Button>
                </Form>
              </Col>

              {/* Right Side - Illustration & Contact Details */}
              <Col
                md={6}
                className="d-flex flex-column justify-content-center align-items-center bg-light p-5"
              >
                <img
                  src="/contact-illustration.svg"
                  alt="Contact Illustration"
                  className="img-fluid mb-3"
                />
                <p className="text-muted text-center">
                  Need help? Get in touch with us today!
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
