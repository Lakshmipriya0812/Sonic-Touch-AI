import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const ProductGrid = ({ products }) => {
  return (
    <Row>
      {products.map((product) => (
        <Col key={product.id} md={3} className="mb-4">
          <Card className="shadow-sm">
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                <span className="fw-bold">${product.price}</span>{" "}
                {product.oldPrice && (
                  <del className="text-muted">${product.oldPrice}</del>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductGrid;
