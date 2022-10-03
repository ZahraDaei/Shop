import React, { useEffect } from "react";
import {
    Col,
    Container,
    Row
} from "react-bootstrap";
import ShippingHeader from "./components/ShippingHeader";
// import { selectAddress } from "./shoppingCartSlice";
const Shipping = (props) => {
  // var address = useSelector(selectAddress());


  useEffect(() => {});
  return (
    <Container>
      <ShippingHeader />
      <Row>
        <Col lg={8} sm={12}>
         
          {/* {address !== null ? (
            <div className="border m-3 p-2 radious">
              <span className="greyColor smaller p-3">آدرس تحویل سفارش</span>
            </div>
          ) : (
            <div>انتخاب آدرس</div>
          )} */}
        </Col>
        <Col lg={4} sm={12}>
          <div className="border m-3 p-2 radious"></div>
        </Col>
      </Row>
    </Container>
  );
};

Shipping.propTypes = {};

export default Shipping;
