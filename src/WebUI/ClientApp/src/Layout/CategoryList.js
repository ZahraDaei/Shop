import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectCounts } from "../features/Cart/shoppingCartSlice";
import { selectCategoryTreeList, selectLoadingTree } from "../features/category/categorySlice";
import { Container } from "react-bootstrap";

const CategoryList = (props) => {
    var counts = useSelector(selectCounts);
    var productCategories = useSelector(selectCategoryTreeList);
    var loading = useSelector(selectLoadingTree);
    // var user = useSelector(selectUser);
    // var loadingUser = useSelector(selectLoadingUser);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: "CATEGORY_TREE_FETCH_START" });
        //  dispatch({ type: "USER_FETCH_START" });
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

    //useEffect(async () => {
    //    var authenticationCondition = await authService.isAuthenticated();
    //    setUserAuthentication(authenticationCondition);
    //}, []);
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
                <div style={{ display: "flex", flexDirection: "column" , width:"70%"}}>
                    {renderTree(productCategories.children)}
                </div>
        );
    }
};

CategoryList.propTypes = {};

export default CategoryList;
