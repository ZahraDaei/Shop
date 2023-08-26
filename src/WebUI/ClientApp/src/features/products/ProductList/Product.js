import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    getSubCategories
} from "../../category/categorySlice";
import Breadcrumbs from "../components/Breadcrumbs";
import Category from "../components/Category";
import "../Product.css";
import {
    selectLoadingProductCategoryList
} from "../productSlice";
import AdvanceSearch from "./AdvancedSearch/AdvanceSearch";
import ProductList from "./components/ProductList";


const Product = () => {
    const { categoryName } = useParams();

    const dispatch = useDispatch()
    const loading = useSelector(selectLoadingProductCategoryList);


    useEffect(() => {
        dispatch({ type: 'CATEGORY_FETCH_START' });
        dispatch({ type: 'PRODUCT_FETCH_START' });
        dispatch({ type: 'PRODUCT_CATEGORY_LIST_FETCH_START' });
    }, [])
    useEffect(() => {
        
        dispatch(getSubCategories(categoryName))
    }, [categoryName])



    if (loading) {
        return <div>در حال بارگزاری...</div>
    }
    else {

        return (
            <div >
                <Breadcrumbs categoryName={categoryName} />
                <Category categoryName={categoryName} />

                <Row>
                    <Col xs={12} md={4}>
                        <AdvanceSearch categoryName={categoryName} />
                    </Col>
                    <Col xs={12} md={8}>
                        <ProductList categoryName={categoryName} />
                    </Col>
                </Row>
            </div>
        );
    }
}


Product.propTypes = {};

export default Product;
