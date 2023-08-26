import BootstrapTable from 'react-bootstrap-table-next';
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategoryList } from "../../../category/categorySlice";
import { Container } from "react-bootstrap";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from "react-router-dom"
import { AppPath } from 'AppPathConstant';
import { BsThreeDots } from "react-icons/bs";



const pagination = paginationFactory();


export default function CategoryTable() {

    const [id, setId] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);
    const handleClick = (id) => {
        setId(id);
        handleShow();
    }
    const columns = [{
        dataField: 'id',
        text: 'شناسه',
        headerStyle: { width: '80px' }
    },
    {
        dataField: 'farsiName',
        text: 'نام دسته بندی',
        headerStyle: { width: "300px" },

    },
    {
        dataField: '',
        text: '',
        isDummyField: true,
        headerStyle: { width: '100px' },
        formatter: (cell, row, rowIndex) => {
            var id = row.id;
            return (
                <>
                    <Link to={`${AppPath.EditCategory}?id=${id}`}><AiOutlineEdit /></Link>
                    <Link onClick={(e) => handleClick(id)} to={AppPath.Category}><AiOutlineDelete style={{ marginRight: "20px" }} /></Link>
                    <Link to={`${AppPath.CategoryDetail}?id=${id}`}><BsThreeDots style={{ marginRight: "20px" }} /></Link>
                </>
            )
        }

    }];
    const categories = useSelector(selectCategoryList);
    return (<>
        <Container>
            <div style={{display:"flex",justifyContent:"center" }}>
                <div style={{ maxWidth: "400px" }}>
                    <BootstrapTable keyField='id' data={categories} columns={columns} pagination={pagination} />
                </div>
            </div>
        </Container>
    </>
    )
}