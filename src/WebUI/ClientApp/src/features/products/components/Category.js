import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { selectCategoryList, selectSubCategory } from "../../category/categorySlice";
import { useSelector } from "react-redux";


const Category = () => {

    var categoryList = useSelector(selectCategoryList)
    var category = useSelector(selectSubCategory)

    return (
        <div style={{ margin: "0 20px" }}>
            <Row>
                <Col xs={12} md={12}>
                    <div>
                        <div
                            style={{
                                backgroundColor: "white",
                                borderRadius: "5px",
                                padding: "20px",
                                textAlign: "right"
                            }}
                        >
                            <h5>دسته بندی ها</h5>
                            <div className="category">
                                {category.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <Link to={`/search/${item.name}`}>
                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                    <img width="60px" height="60px" src={`data:image/jpeg;base64,${item.content}`} />
                                                    <span>{item.farsiName}</span>
                                                </div>
                                            </Link>
                                        </div>
                                    );

                                })}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

Category.propTypes = {};

export default Category;
