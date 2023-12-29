import React from "react";
import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import Caro from "./Caro";

const TopPart = (props) => {
    return (
        <Container>
            <div className="caroWrapper" >
                <Row>
                    <Col sm={12} md={6}>
                        <div className="flexColumn">
                            <div className="titleWrapper">
                                <div className="tAlignT">
                                    <p>انتخاب درست</p>
                                </div>
                                <div className="tAlignC">
                                    <p>خدمات درست</p>
                                </div>
                            </div>
                            <div className="desStyle">مرکز فروش دستگاههای قهوه ساز و ارائه دهنده خدمات پس از فروش</div>
                        </div>
                    </Col>
                    <Col sm={12} md={6} style={{ display:"flex",justifyContent:"center" }}>
                        <Caro />
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

TopPart.Types = {};

export default TopPart;
