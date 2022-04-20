import React, { useEffect } from "react";
import { Nav, Navbar, NavDropdown, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCounts } from "../../features/Cart/shoppingCartSlice"
import { selectCategoryList } from "../../features/category/categorySlice";


const NavMenu = (props) => {
    var counts = useSelector(selectCounts)
    var productCategories = useSelector(selectCategoryList);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type:"CATEGORY_FETCH_START"})
    },[])
    return (
        <div style={{ padding: "20px", backgroundColor: "white", marginBottom: "20px" }}>
            <Navbar expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavDropdown title="دسته بندی کالاها" id="basic-nav-dropdown">
                            {productCategories.map((item, index) => {
                                return <NavDropdown.Item
                                    key={index}
                                    style={{ textAlign: "right" }}
                                >
                                    <Link to={`/${item.name}`}>{item.farsiName}</Link>
                                </NavDropdown.Item>
                            })}

                        </NavDropdown>
                        <Nav.Link href="/checkout/cart"> سؤالی دارید؟</Nav.Link>
                        <Nav.Link href="/checkout/cart">سوپر مارکت</Nav.Link>

                        <Nav.Link href="/checkout/cart">سبد خرید
                            <Badge text="danger" bg="light">{counts == 0 ? null : counts}</Badge></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <h4>
                    <Link to="/">توکا</Link>
                </h4>
            </Navbar>
        </div>
    );
};

NavMenu.propTypes = {};

export default NavMenu;
