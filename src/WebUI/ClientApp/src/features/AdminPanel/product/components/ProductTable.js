import React, { useState } from "react";
import { Container } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppPath } from '../../../../AppPathConstant';
import { selectProducts } from "../../../products/productSlice";

import DeleteProduct from './DeleteProduct';

const pagination = paginationFactory();

export default function ProductTable() {

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
        text: 'نام محصول',
        headerStyle: { width: "300px" },

    }, {
        dataField: 'shortDescription',
        text: 'توصیف',
        headerStyle: { width: "300px" },

    }, {
        dataField: 'price',
        text: 'قیمت',
        headerStyle: { width: "100px" },

    },
    {
        dataField: '',
        text: '',
        isDummyField: true,
        headerStyle: { width: '150px' },
        formatter: (cell, row, rowIndex) => {
            var id = row.id;
            return (
                <>
                    <Link to={`${AppPath.EditProduct}?id=${id}`}><AiOutlineEdit /></Link>
                    <Link onClick={(e) => handleClick(id)} to={AppPath.Product}><AiOutlineDelete style={{ marginRight: "20px" }} /></Link>
                    <Link to={`${AppPath.AdminProductDetail}?id=${id}`}><BsThreeDots style={{ marginRight: "20px" }} /></Link>
                </>
            )
        }

    }];
    const products = useSelector(selectProducts);

    return (<>
        <Container>
            <DeleteProduct show={show} handleClose={handleClose} id={id} />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="w-75">
                    <BootstrapTable keyField='id' data={products} columns={columns} pagination={pagination} />
                </div>
            </div>
        </Container>
    </>
    )
}