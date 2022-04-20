import BootstrapTable from 'react-bootstrap-table-next';
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProducts } from "../../../products/productSlice";
import { Container } from "react-bootstrap";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from "react-router-dom"


const pagination = paginationFactory();
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
    headerStyle: { width: "300px" },

},
{
    dataField: '',
    text: '',
    isDummyField: true,
    headerStyle: { width: '100px' },
    formatter: (cell, row, rowIndex) => {
        return (
            <>
                <Link to="/Admin/product"><AiOutlineEdit /></Link>
                <Link to="/Admin/product"><AiOutlineDelete style={{ marginRight: "20px" }} /></Link>
            </>
        )
    }

}];

export default function ProductTable() {


    const products = useSelector(selectProducts);
    return (<>
        <Container>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ maxWidth: "400px" }}>
                    <BootstrapTable keyField='id' data={products} columns={columns} pagination={pagination} />
                </div>
            </div>
        </Container>
    </>
    )
}