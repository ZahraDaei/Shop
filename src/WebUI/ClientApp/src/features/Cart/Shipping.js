import React, { useEffect, useState } from "react";
import {
    Col,
    Container,
    Row
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectAddresses } from "../user/addressSlice";
import { AppPath } from '../../AppPathConstant';
import { selectShoppingCartProducts } from "./shoppingCartSlice";

import ShippingHeader from "./components/ShippingHeader";
const Shipping = (props) => {

    const addresses = useSelector(selectAddresses);
    var shoppingCartProducts = useSelector(selectShoppingCartProducts);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: 'ADDRESSES_FETCH_START' });
    }, []);

    const [selectedAdderssId, SetSelectedAddressId] = useState();
    const [submitbtnDisabled, setSubmitBtn] = useState(true);
    const onAddressChanged = (e) => {
        setSubmitBtn(false);
        SetSelectedAddressId(e.currentTarget.value);
    }
    const history = useHistory();


    const formSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: 'shoppingCart/optShippingAddress', payload: addresses.filter(a => a.id === +selectedAdderssId)[0] });
        history.push(AppPath.CheckoutPayment);



    }
    return (
        <Container>
            <ShippingHeader step="shipping" />


            <Row>
                <Col lg={8} sm={12}>
                    <Row>
                        <div className="m-3">
                            آدرس تحویل سفارش
                        </div>
                    </Row>
                    {addresses?.length > 0 ? (
                        <div className="border m-3 p-2 radious">
                            <span className="greyColor smaller p-3">انتخاب آدرس</span>
                            <div class="p-3 mt-3">
                                <form onSubmit={formSubmit}>

                                    {addresses.map((item, index) => {
                                        return <div className="p-2 d-flex flex-row">

                                            <input
                                                type="radio"
                                                name={index}
                                                value={item.id}
                                                checked={+selectedAdderssId === item.id}
                                                onClick={onAddressChanged}
                                            />
                                            {`${item.city}, ${item.addressDetail}, ${item.number}`}
                                        </div>
                                    }
                                    )}
                                    <div className="d-flex justify-content-end">
                                        <button className="btn btn-primary " type="submit" disabled={submitbtnDisabled}>
                                            ثبت آدرس
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    ) : (
                        <div>
                            <p>ایجاد آدرس</p>
                        </div>
                    )}
                </Col>
                <Col lg={4} sm={12}>
                    <Row>
                        <div className="m-3">
                            محصولات این سفارش
                        </div>
                    </Row>

                    <div style={{height:"350px"}} className="overflow-auto">
                        {shoppingCartProducts.map((item, i) => {
                            return (
                                <div className="productCart mt-3 d-flex flex-row ">
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
                </Col>
            </Row>
        </Container>
    );
};

Shipping.propTypes = {};

export default Shipping;
