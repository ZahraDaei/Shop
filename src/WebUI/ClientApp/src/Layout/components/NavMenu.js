import React, { useEffect, useState } from "react";
import { Nav, Navbar, NavDropdown, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCounts } from "../../features/Cart/shoppingCartSlice"
import { selectCategoryTreeList } from "../../features/category/categorySlice";
import { selectLoadingTree } from "../../features/category/categorySlice";
import TreeView from '@mui/lab/TreeView';
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { FcExpand } from 'react-icons/fc';
import { BsChevronLeft } from 'react-icons/bs';


const NavMenu = (props) => {
    var counts = useSelector(selectCounts)
    var productCategories = useSelector(selectCategoryTreeList);
    var loading = useSelector(selectLoadingTree);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: "CATEGORY_TREE_FETCH_START" })
    }, [])


    const [catId, setCatId] = useState(1);
    const renderTreeChildren = (nodes, firstChildrenLevel) => {
        return nodes.map(n => {

            return (
                <div key={n.item.id}>
                    <Nav.Link href={`${n.item.name}`}>
                        <div className={firstChildrenLevel ? "firstChild" : ""}  name={n.item.id}>

                            {n.item.farsiName}
                        </div>
                    </Nav.Link>
                    {

                        Array.isArray(n.children)
                            ? renderTreeChildren(n.children, false)
                            : null
                    }
                </div>
            )
        })
    }
    const renderTree = (nodes) => {
        var item = nodes.reduce((p, c) => p.item.id < c.item.id ? p : c);
        return nodes.map(n => {
            return (
                <div key={n.item.id}>
                    <div className={catId == n.item.id?"categoryRoot categoryRootHover":"categoryRoot"} onMouseEnter={() => setCatId(n.item.id)}>
                        <Nav.Link href={`${n.item.name}`}>
                            <div  name={n.item.id}  >{n.item.farsiName}</div>
                        </Nav.Link>
                    </div>
                    <div className={catId==n.item.id?"subCat":"hideBox"} >
                        {

                            Array.isArray(n.children)
                                ? renderTreeChildren(n.children, true)
                                : null
                        }
                    </div>

                </div>

            )
        }
        )
    }






    if (loading) {
        return (<div>در حال بارگزاری...</div>)
    } else {

        return (
            <div style={{ padding: "20px", backgroundColor: "white", marginBottom: "20px" }}>

                <Navbar expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="ml-auto">

                            <Nav.Link className="categoryShower" href="#"> دسته بندی
                            </Nav.Link>
                            <div className="hide">
                                <div style={{ display: "flex", flexDirection: "column" }}>

                                    {renderTree(productCategories.children)}

                                </div>
                            </div>
                            <Nav.Link href="/checkout/cart"> سؤالی دارید؟</Nav.Link>
                            <Nav.Link href="/checkout/cart">سوپر مارکت</Nav.Link>
                            <Nav.Link href="/checkout/cart">سبد خرید
                            <Badge text="danger" bg="light">{counts == 0 ? null : counts}</Badge>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <h4>
                        <Link to="/">توکا</Link>
                    </h4>
                </Navbar>
            </div>
        );
    }

};

NavMenu.propTypes = {};

export default NavMenu;




