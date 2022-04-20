import React from "react";
import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import Caro from "./Caro";

const TopPart = (props) => {
  return (
    <Container>
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row>
        <Col xs={12} md={12}>
          <div style={{ overflow: "hidden", borderRadius: "10px" }}>
            <Caro />
          </div>
        </Col>
        {/* <Col xs={6} md={4}>
          <Row>
            <Col md={12}>
              <div style={{
                    backgroundColor:"#c5b2b278", borderRadius: "10px",position:"relative"
                  }}>
                <div
                  style={{
                    overflow: "hidden",
                    borderRadius: "100%",
                    width: "60%",
                  }}
                >
                  <img
                    width="400px"
                    height="200px"
                    className="d-block w-100"
                    src="images/image7.jpg"
                    alt="First slide"
                  />
                </div>
                  <p style={{position:"absolute",top:"20%",left:"20%",color:"#6d219d",fontWeight:"bold"}}>
                    به صرفه و طبیعی
                    </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}></Col>
          </Row>
        </Col> */}
      </Row>
    </Container>
  );
};

TopPart.Types = {};

export default TopPart;
