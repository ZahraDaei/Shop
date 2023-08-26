import React, { useState, useEffect } from "react";
import ProductTable from "./components/ProductTable";
import { Button, Spinner } from "react-bootstrap"
import { selectLoadingProducts } from "../../products/productSlice";
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import "./AdminProduct.css";
const AdminProduct = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: 'PRODUCT_FETCH_START' });
        dispatch({ type: 'CATEGORY_FETCH_START' });
        dispatch({ type: 'PRODUCT_CATEGORY_LIST_FETCH_START' });

    }, [])

    const [content, setContent] = useState();

    const loading = useSelector(selectLoadingProducts);
    useEffect(() => {

        if (loading) {
            setContent(<Spinner />)
        } else {
            setContent(<ProductTable />)
        }
    }, [loading])



    return (
        <>
            <div style={{ display: "flex", justifyContent: "left", padding: "20px" }}>
                <Link to="/Admin/product/CreateProduct" >
                    <Button >
                        <span style={{ color: "white!important" }}>محصول جدید</span>
                    </Button>
                </Link>
            </div>
            {content}
        </>
    );
}


AdminProduct.propTypes = {};

export default AdminProduct;
