import React from "react";
import PropTypes from "prop-types";

const ProductInfo = ({ product }) => {
    return (
        <div>
            <h6>{product.name} </h6>
            <div className="flex_row">
                <span className="noFocus">{product.enName}</span>{" "}
                <div className="emtedadLine mr-1"></div>
            </div>
            <p>{product.description}</p>
            <div>
                <h5>ویژگی ها</h5>
                <ul>
                    {product?.specifications?.map((item, i) => (
                        <li key={i}>
                            {item["key"]}:{item["value"]}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

ProductInfo.propTypes = {};

export default ProductInfo;
