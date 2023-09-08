import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import {
    getProductsAsync,
    selectLoadingProductCategoryList,
    getProductById,
    getProductsByCategory,
    selectProductByCategory,
} from "../../productSlice";
import "react-placeholder/lib/reactPlaceholder.css";
import ReactPlaceholder from 'react-placeholder';
import PlaceHolder from "../../../PlaceHolder";

const ProductList = ({ categoryName }) => {
    const products = useSelector(selectProductByCategory);
    const loading = useSelector(selectLoadingProductCategoryList);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductsByCategory(categoryName));
    }, [categoryName]);


    return (
        <div style={{ borderRadius: "10px", margin: "20px 10px 20px 60px" }}>
            <Row
                style={{
                    paddingRight: "0!important",
                    paddingLeft: "100px!important",
                }}
                xs={1}
                sm={3}
                md={4}
                lg={5}
                className="g-4"
            >
                {products?.map((item, index) => (
                    <Col key={index}>
                        <ReactPlaceholder customPlaceholder={<PlaceHolder />} ready={!loading} showLoadingAnimation={true}   color='#E0E0E0' style={{ width: 50, height: 50 }}>
                            <ProductCard item={item} />
                        </ReactPlaceholder>
                    </Col>
                ))}
            </Row>
        </div >
    );
}


ProductList.propTypes = {};

export default ProductList;
