import React, { useEffect, useState } from "react";
import { ApplicationPaths } from "../../components/api-authorization/ApiAuthorizationConstants";
import authService from "../../components/api-authorization/AuthorizeService";
import { LoginMenu } from "../../components/api-authorization/LoginMenu";
import { Nav, Navbar, NavDropdown, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCounts } from "../../features/Cart/shoppingCartSlice";
import { selectCategoryTreeList } from "../../features/category/categorySlice";
import { selectUser, selectLoadingUser } from "../../features/user/userSlice";
import { selectLoadingTree } from "../../features/category/categorySlice";
import { TfiShoppingCart } from "react-icons/tfi";

import { createAsyncThunk } from "@reduxjs/toolkit";

const NavMenu = (props) => {
  var counts = useSelector(selectCounts);
  var productCategories = useSelector(selectCategoryTreeList);
  var loading = useSelector(selectLoadingTree);
  var user = useSelector(selectUser);
  var loadingUser = useSelector(selectLoadingUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "CATEGORY_TREE_FETCH_START" });
    dispatch({ type: "USER_FETCH_START" });
  }, []);

  const [catId, setCatId] = useState(1);
  const renderTreeChildren = (nodes, firstChildrenLevel) => {
    return nodes.map((n) => {
      return (
        <div key={n.item.id}>
          <Nav.Link href={`search/${n.item.name}`}>
            <div
              className={firstChildrenLevel ? "firstChild" : ""}
              name={n.item.id}
            >
              {n.item.farsiName}
            </div>
          </Nav.Link>
          {Array.isArray(n.children)
            ? renderTreeChildren(n.children, false)
            : null}
        </div>
      );
    });
  };
  const [userAuthentication, setUserAuthentication] = useState();

  useEffect(async () => {
    var authenticationCondition = await authService.isAuthenticated();
    setUserAuthentication(authenticationCondition);
  }, []);
  const renderTree = (nodes) => {
    var item = nodes.reduce((p, c) => (p.item.id < c.item.id ? p : c));
    return nodes.map((n) => {
      return (
        <div key={n.item.id}>
          <div
            className={
              catId == n.item.id
                ? "categoryRoot categoryRootHover"
                : "categoryRoot"
            }
            onMouseEnter={() => setCatId(n.item.id)}
          >
            <Nav.Link href={`search/${n.item.name}`}>
              <div name={n.item.id}>{n.item.farsiName}</div>
            </Nav.Link>
          </div>
          <div className={catId == n.item.id ? "subCat" : "hideBox"}>
            {Array.isArray(n.children)
              ? renderTreeChildren(n.children, true)
              : null}
          </div>
        </div>
      );
    });
  };

  if (loading) {
    return <div>در حال بارگزاری...</div>;
  } else {
    return (
      <div
        style={{
          padding: "20px",
          backgroundColor: "white",
          marginBottom: "20px",
        }}
      >
        <Navbar expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <h4>
                <Link to="/">شهزاد</Link>
              </h4>
              <Nav.Link className="categoryShower " href="#">
                {" "}
                دسته بندی
              </Nav.Link>
              <div className="hideCategory">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {renderTree(productCategories.children)}
                </div>
              </div>
              <Nav.Link href="/checkout/cart">سبد خرید</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="d-flex">
            <LoginMenu></LoginMenu>
            <div className="flex_row">
              <div className="mr-2 pr-2 pipe">
                <Link to="/checkout/cart">
                  <TfiShoppingCart size={25} />

                  <Badge text="danger" bg="light">
                    {counts == 0 ? null : counts}
                  </Badge>
                </Link>
              </div>
            </div>
          </div>
        </Navbar>
      </div>
    );
  }
};

NavMenu.propTypes = {};

export default NavMenu;
