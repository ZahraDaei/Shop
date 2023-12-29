import React from "react";
import PropTypes from "prop-types";
import { Card, CardGroup, Col, Container, Row } from "react-bootstrap";

const MiddlePart = (props) => {
    const midImgs = [
        { src: "cofeeSales.jpg" },
        { src: "fix.jpg" },
        { src: "sales.jpg" },
    ]
    return (

        <Row >
            {midImgs.map((item, index) => <Col className="justify-content-center d-flex" sm={12} md={4} >
                    <img
                        style={{ width: "50%",maxWidth:"150px" }}
                        className="d-block"
                        src={`card/${item.src}`}
                        alt={`card/${item.src}`}
                    />
                </Col>
                )}
        </Row>

    );
};

MiddlePart.propTypes = {};

export default MiddlePart;
