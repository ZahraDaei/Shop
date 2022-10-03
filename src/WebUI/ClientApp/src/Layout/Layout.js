import React from "react";
import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import NavMenu from "./components/NavMenu";
import "./Layout.css";
import Footer from "./components/Footer";
const Layout = (props) => {
    return (
        <div dir="rtl" style={{ backgroundColor: "white", textAlign:"right" }}>
      <NavMenu />
            <Row style={{display:"block",overflow:"auto"}}>
          <Col>{props.children}</Col>
        </Row>
      <Footer />
    </div>
  );
};

Layout.propTypes = {};

export default Layout;
