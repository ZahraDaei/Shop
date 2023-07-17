import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Basket from "./components/Basket";
import CartContinue from "./components/CartContinue";
import { selectShoppingCartProducts } from "./shoppingCartSlice";
import ShippingHeader from "./components/ShippingHeader";


const Cart = (props) => {
    var shoppingCartProducts = useSelector(selectShoppingCartProducts);
    if (shoppingCartProducts.length === 0) {
        return <h3 className="pageNotification">سبد خرید شما خالی است</h3>;
    } else {
        return (
            <Container>
                <ShippingHeader step="cart" />
                <Row>
                    <div className="m-3">
                        سبد خرید
                    </div>
                </Row>
                <Row>
                    <Col lg={8} sm={12}>
                        <div className="shoppingCartProduct m-2">                          
                            <Basket shoppingCartProducts={shoppingCartProducts} />
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
