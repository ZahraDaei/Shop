import React from "react";
import PropTypes from "prop-types";
import { Carousel } from "react-bootstrap";

const Caro = (props) => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            width="800px"
            height="400px"
            className="d-block w-100"
            src="images/image1.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3  style={{color:"white"}}>تنوع بالا</h3>
            <p style={{color:"white"}}>ارائه دهنده پوشاک متنوع برای هر سلیقه ای</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            width="800px"
            height="400px"
            className="d-block w-100"
            src="images/image3.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>همه سایزها</h3>
            <p>در هر سایز اندازه و رنگی می توان انتخاب کرد</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            width="800px"
            height="400px"
            className="d-block w-100"
            src="images/image4.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3  style={{color:"black"}}>بهترین الیاف</h3>
            <p  style={{color:"black"}}>
              کیفیت بالا تنها شعار نیست.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

Caro.propTypes = {};

export default Caro;
