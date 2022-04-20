import React, { useState, useEffect } from "react";
import CategoryTable from "./components/CategoryTable";
import { Button, Spinner } from "react-bootstrap"
import { selectLoading } from "../../category/categorySlice";
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import "./AdminCategory.css";
const AdminCategory = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: 'CATEGORY_FETCH_START' });

    }, [])

    const [content, setContent] = useState();

    const loading = useSelector(selectLoading);
    useEffect(() => {

        if (loading) {
            setContent(<Spinner />)
        } else {
            setContent(<CategoryTable />)
        }
    }, [loading])



    return (
        <>
            <div style={{ display: "flex", justifyContent: "left", padding: "20px" }}>
                <Link to="/Admin/Category/CreateCategory" >
                    <Button >
                        <span style={{ color: "white!important" }}>دسته بندی جدید</span>
                    </Button>
                </Link>
            </div>
            {content}
        </>
    );
}


AdminCategory.propTypes = {};

export default AdminCategory;
