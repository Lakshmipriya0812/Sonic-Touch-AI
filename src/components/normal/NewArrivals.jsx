import React from "react";
import { Row, Col } from "react-bootstrap";

const newArrivals = [
  { title: "New Arrivals", image: "/images/new-arrivals.jpg" },
  { title: "Big Sale", image: "/images/big-sale.jpg" },
  { title: "Sunglasses", image: "/images/sunglasses.jpg" },
];

const NewArrivals = () => {
  return (
    <Row className="text-center my-4">
      {newArrivals.map((item, index) => (
        <Col key={index} md={4}>
          <div className="new-arrivals-card position-relative">
            <img
              src={item.image}
              alt={item.title}
              className="img-fluid rounded-circle"
            />
            <h5 className="position-absolute bottom-0 w-100 bg-dark text-white py-2">
              {item.title}
            </h5>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default NewArrivals;
