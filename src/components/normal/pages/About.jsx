import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const About = ({ isAuthenticated }) => {
  return (
    <>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <h1 className="text-center fw-bold mb-4">About Sonic Touch</h1>
                <p className="lead text-muted text-center">
                  {/* Add your content here */}
                  What Sonic Touch is...
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
