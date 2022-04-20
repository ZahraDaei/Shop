import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

const LastPart = (props) => {
  return (
    <div className="footer" >
      
          <Row>
            <Col xs={12} md={6}>
              1 of 2
            </Col>
            <Col xs={12} md={6}>
              2 of 2
            </Col>
          </Row>
    
    </div>
  );
};

LastPart.propTypes = {};

export default LastPart;
