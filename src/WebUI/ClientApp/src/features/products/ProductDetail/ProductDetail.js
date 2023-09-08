import React, { useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ProductInfo from "./components/ProductInfo";

import {
    clearProduct,
    selectLoadingProduct,
    selectProductById
} from "../productSlice";
import ShoppingCartSection from "./components/ShoppingCartSection";
const ProductDetail = (props) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(selectProductById);
    const loading = useSelector(selectLoadingProduct);

    useEffect(() => {
        dispatch({ type: "GET_PRODUCT_BY_ID_START", payload: id });
        return () => {
            dispatch({ type: "product/clearProduct" })
        }
    }, [id]);


    if (loading) {
        return <Spinner animation="border" variant="primary" />
    } else {
        return (
            <div>
                <Row style={{ padding: "0 40px" }}>
                    <Col sm={12} lg={4}>
                        <div>
                            <img
                                src={`/images/product/${product?.images[0]}`}
                                alt="MISSING JPG"
                                style={{ maxWidth: "100%" }}
                            />
                        </div>
                        <div className="d-flex flex-row" style={{ maxWidth: "100%",height:"25%" }}
>
                            {
                                product?.images.map(x =>
                                    <div>
                                        <img
                                            src={`/images/product/${x}`}
                                            alt="MISSING JPG"
                                            style={{ maxWidth: "100%",height:"100%" }}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </Col>
                    <Col sm={12} lg={5}>
                        <ProductInfo product={product} />
                    </Col>
                    <Col sm={12} lg={3}>
                        <ShoppingCartSection product={product} />
                    </Col>
                </Row>
            </div>
        );
    }
};

ProductDetail.propTypes = {};

export default ProductDetail;
