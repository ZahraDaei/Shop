
import { selectLoading as categoryLoading, selectLoadingTree } from "features/category/categorySlice";
import { clearProduct, selectLoadingProduct } from "features/products/productSlice";
import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import EditProductForm from "./EditProductForm"

export default function EditProduct() {
    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: "alert/hideAlert" })
        dispatch({ type: "GET_PRODUCT_BY_ID_START", payload: id })
        dispatch({ type: "CATEGORY_TREE_FETCH_START" })
        dispatch({ type: "CATEGORY_FETCH_START" })
    }, [])
    const loading = useSelector(selectLoadingProduct);
    var catLoading = useSelector(selectLoadingTree);
    var catListLoading = useSelector(categoryLoading);


    useEffect(() => {
        return () => dispatch(clearProduct()); // <-- reset when unmounting
    }, []);

    if (catLoading || catListLoading || loading) {
        return <div style={{ display: "flex", alignItems: "center" }}><Spinner animation="border" variant="primary" /></div>
    } else {
        return <EditProductForm/>       
    }
}