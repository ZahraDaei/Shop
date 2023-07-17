import React, { useEffect, useState } from "react";
import {
    Col,
    Container,
    Row
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectAddresses } from "../user/addressSlice";
import { selectShoppingCartProducts, selectShippingAddress } from "./shoppingCartSlice";
import CartNumber from "./components/CartNumber";
import { Button } from 'react-bootstrap'
import ShippingHeader from "./components/ShippingHeader";
import { Link } from 'react-router-dom';
import { selectTotal } from './shoppingCartSlice';

const Payment = (props) => {

    var shoppingCartProducts = useSelector(selectShoppingCartProducts);
    var selectedAdd = useSelector(selectShippingAddress);
    var total = useSelector(selectTotal);

    const dispatch = useDispatch()



    const formSubmit = (event) => {
        event.preventDefault();
        // dispatch({ type: 'shoppingCart/optShippingAddress', payload: addresses.filter(a => a.id === +selectedAdderss)[0] });

    }
    return (
        <Container>
            <ShippingHeader step="payment" />
            <Row>
                <div className="m-3">
                    محصولات این سفارش
                </div>
            </Row>
            <Row>

                <Col lg={8} sm={12}>
                    <div style={{ height: "500px" }} className="overflow-auto">
                        {shoppingCartProducts.map((item, i) => {
                            return (
                                <div className="productCart d-flex flex-row ">
                                    <div className="shoppingCartImg">
                                        <img className="imgWidth mt-2" src={`/images/${item.product.image}`} />
                                    </div>
                                    <div className=" p-3 d-flex justify-content-between w-100">
                                        <span>{item.product.farsiName}</span>
                                        <span>{item.number} عدد</span>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div>
                        این سفارش به آدرس {`${selectedAdd.city}, ${selectedAdd.addressDetail}`} ارسال می شود.
                    </div>
                </Col>
                <Col lg={4} sm={12}>
                    <div className="border radious p-5" >
                        <div className="d-flex justify-content-between mt-3">
                            <span>جمع سبد خرید</span>
                            <span className='price'>{total}</span>
                        </div>
                        <p className='d-flex justify-content-center mt-4 '>
                            <Button className="btn-block" variant="danger"><Link to="/checkout/shipping">پرداخت</Link></Button>
                        </p>                    </div>
                </Col>
            </Row>
        </Container>
    );
};

Payment.propTypes = {};

export default Payment;
