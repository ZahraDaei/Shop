import React from "react";
import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";

const Footer = (props) => {
  return (
      <div className="footer">
<Container>
      <Row>
        <Col xs={12} md={6}>
          <div style={{ padding: "20px 20px" }}>اطلاعات تماس</div>
          <p>تلفن تماس با بشتیبانی: ۱۱۹۹</p>
          <p>آدرس بستی: تهران صندوق بستی ۱۱۲۲۳۳۴۴۵۵</p>
        </Col>
        <Col xs={12} md={6}>
          <div style={{ padding: "20px 20px" }}>لینکهای مهم</div>
          <ul className="links">
              <li><a href="#">گوگل</a></li>
              <li><a href="#">توییتر</a></li>
              <li><a href="#">لینکدین</a></li>
             
          </ul>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div>
            فروشگاه اینترنتی تولید با افتخار در ارائه خدمات مختلف فروشگاهی و
            رفاهی جهت تأمین نیازهای مصرف کنندگان گرامی نهایت سعی و تلاش خود را
            کرده است که بتواند خدمات بهینه در اسرع وقت ارائه نماید.
          </div>
          <hr/>
          <h5 style={{textAlign:"center"}}>
              استفاده از مطالب این فروشگاه صرفا با ارائه منبع مجاز می باشد و کلیه حقوق متعلق به شرکت تولید است.
          </h5>
        </Col>
      </Row>
      </Container>
    </div>
  );
};

Footer.propTypes = {};

export default Footer;
