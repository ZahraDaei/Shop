import React from "react";
import PropTypes from "prop-types";
import { Card, CardGroup, Col, Container, Row } from "react-bootstrap";

const MiddlePart = (props) => {
  return (
    <div>
      <div
        style={{ margin: "30px 0", overflow: "hidden", borderRadius: "10px",padding:"10px" }}
      >
        <CardGroup >
          <Card>
            <Card.Img style={{height:"300px"}} variant="top" src="images/image9.jpg" />
            <Card.Body>
              <Card.Title>لباس بانوان</Card.Title>
              <Card.Text>
                تنوع بالای لباس بانوان باعث افزایش قدرت انتخاب شمااست.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img style={{height:"300px"}} variant="top" src="images/image8.jpg" />
            <Card.Body>
              <Card.Title>لباس آقایان</Card.Title>
              <Card.Text>
                هر آنچه شما نیاز دارید و می پسندید.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img style={{height:"300px"}} variant="top" src="images/image7.jpg" />
            <Card.Body>
              <Card.Title>لباس کودکان</Card.Title>
              <Card.Text>
                با انتخاب درست و به دلخواه می توان به سلیقه مشتری احترام گذاشت.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
        </CardGroup>
      </div>
    </div>
  );
};

MiddlePart.propTypes = {};

export default MiddlePart;
