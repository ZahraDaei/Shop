import React from "react";
import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import NavMenu from "./components/NavMenu";
import "./Layout.scss";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";

const Layout = (props) => {
    return (
        <>
            <div className="mobileMenu">
                <Link to="/profile">پروفایل</Link>
                <Link to="/checkout/cart">سبد خرید</Link>
                <Link to="/CategoryList">دسته بندی</Link>
                <Link to="/">خانه</Link>
            </div>
            <div dir="rtl" style={{ backgroundColor: "white", textAlign: "right" }}>
                <Row style={{ display: "block", overflow: "auto", minHeight: "1000px" }}>
                    <div className="responsiveNavMenu">
                        <NavMenu />
                    </div>
                    <Col>{props.children}</Col>
                </Row>
                <Footer />
            </div>
        </>
    );
};

Layout.propTypes = {};

export default Layout;
