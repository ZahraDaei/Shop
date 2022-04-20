import BootstrapTable from 'react-bootstrap-table-next';
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategoryList } from "../../../category/categorySlice";
import { Container } from "react-bootstrap";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import paginationFactory from 'react-bootstrap-table2-paginator';
import {Link} from "react-router-dom"


const pagination = paginationFactory();
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
        return (
            <>
                <Link to="/Admin/Category"><AiOutlineEdit  /></Link>
                <Link to="/Admin/Category"><AiOutlineDelete style={{ marginRight: "20px" }} /></Link>
            </>
        )
    }

}];

export default function CategoryTable() {

  
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