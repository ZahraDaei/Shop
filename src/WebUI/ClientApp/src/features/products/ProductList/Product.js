import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSubCategories, selectCategoryList } from "../../category/categorySlice";
import Breadcrumbs from "../components/Breadcrumbs";
import Category from "../components/Category";
import "../Product.css";
import AdvanceSearch from "./AdvancedSearch/AdvanceSearch";
import ProductList from "./components/ProductList";

// import { useSelector, useDispatch } from 'react-redux';
// import {
// getProductsAsync,
// selectLoading,
// getProductById,getProductsByCategory,
// selectProductByCategory
// } from '../productSlice';
const Product = () => {
  const { categoryName } = useParams();

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: 'CATEGORY_FETCH_START' });
        dispatch({ type: 'PRODUCT_FETCH_START' });
    }, [])


    if (useSelector(selectCategoryList).lenght !== 0) {
        dispatch(getSubCategories(categoryName));
    }
    // const products = useSelector(selectProductByCategory);

    // const loading = useSelector(selectLoading);
    // const dispatch = useDispatch();
    // useEffect(()=>{
    //   dispatch(getProductsByCategory(categoryName))
    // },[])

    
  
    return (
        <div >
      <Breadcrumbs categoryName={categoryName}/>
      <Category categoryName={categoryName} />

      <Row>
        <Col xs={12} md={4}>
          <AdvanceSearch categoryName={categoryName} />
        </Col>
        <Col xs={12} md={8}>
          <ProductList  categoryName={categoryName} />
        </Col>
      </Row>
    </div>
  );}


Product.propTypes = {};

export default Product;
