import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Basket from "./components/Basket";
import CartContinue from "./components/CartContinue";
import { selectShoppingCartProducts } from "./shoppingCartSlice";

const Cart = (props) => {
  var shoppingCartProducts = useSelector(selectShoppingCartProducts);
  if (shoppingCartProducts.length === 0) {
   return <h3 className="pageNotification">سبد خرید شما خالی است</h3>;
  } else {
    return (
      <Container>
        <div className="title">سبد خرید</div>
        <Row>
          <Col lg={8} sm={12}>
            <div className="shoppingCartProduct m-2">
              <div className="p-3">
                <span>سبد خرید شما</span>
              </div>
             <Basket shoppingCartProducts={shoppingCartProducts}/>
            </div>
          </Col>
          <Col lg={4} sm={12}>
            <CartContinue />
          </Col>
        </Row>
      </Container>
    );
  }
};

Cart.propTypes = {};

export default Cart;
