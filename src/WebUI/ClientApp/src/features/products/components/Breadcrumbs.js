import React from "react";
import { Link } from "react-router-dom";
import { selectMainCategory, selectSubCategory } from "../../category/categorySlice";
import { useSelector } from "react-redux";


const Breadcrumbs = ({ categoryName }) => {

    var category = useSelector(selectSubCategory)
    var mainCategory = useSelector(selectMainCategory)
    if (mainCategory.length <= 1) {
        return null;
    }
    return (
        <ol className="breadcrumb">
            <li className="breadcrumb-item ">
                <Link to="/">خانه</Link>
            </li>
            {/*if (category.length===) {*/}

            {/*}*/}
            {/* Link back to any previous steps of the breadcrumb. */}
            {mainCategory.map(({ farsiName, name }, key) =>
                key + 1 === mainCategory.length ? (
                    <li key={key} className="breadcrumb-item ">
                        {farsiName}
                    </li>
                ) : (
                    <li key={key} className="breadcrumb-item ">
                            <Link to={`/${name}`}>{farsiName}</Link>
                    </li>
                    )
            )}
        </ol>
    );
};

Breadcrumbs.propTypes = {};

export default Breadcrumbs;
