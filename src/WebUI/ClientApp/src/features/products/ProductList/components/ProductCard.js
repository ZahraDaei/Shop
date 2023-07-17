import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
    return (
        <div className="productCard">
            <Link to={`/productdetail/${item.productId}`}>
                <img src={`/images/${item.image}`} style={{ maxWidth: "100%" }} />
            </Link>
            <div style={{ padding: "20px" }}>
                <div style={{ fontSize: "small", height: "50px" }}>{`${item.farsiName} ${item.shortDescription}`}</div>
                <div style={{ marginRight: "15px", textAlign: "left", height: "50px" }}>
                    {item.price} تومان
      </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {};

export default ProductCard;
