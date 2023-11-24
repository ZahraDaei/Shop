import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Spinner } from "react-bootstrap";
import { AppPath } from 'AppPathConstant';
import { Link } from "react-router-dom"
import { getProductById, selectProductById, selectLoadingProduct } from "features/products/productSlice";

export default function AdminProductDetail() {
    const dispatch = useDispatch();

    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")

    const product = useSelector(selectProductById);
    const loading = useSelector(selectLoadingProduct);

    useEffect(() => {
        dispatch({ type: "GET_CATEGORY_BY_ID_START", payload: id })
    }, [])
    if (loading) {
        return <Spinner animation="border" variant="primary" />
    } else {

        return (
            <Row style={{ padding: "0 40px" }}>
                <Col sm={12} lg={4}>
                    <img
                        src={`/images/category/${product.image}`}
                        alt={product.name}
                        style={{ maxWidth: "100%" }}
                    />
                    
                </Col>
                <Col sm={12} lg={8}>
                    <div className="d-flex justify-content-start">
                        <div className="borderStyle formStyle" >
                            <div className="grid-container">
                                <div>
                                    <div className=" inputFlexBox justifyLeft" >
                                        <label className="text-secondary">نام محصول (انگلیسی):</label>
                                        <div >{product.name}</div>
                                    </div>
                                </div>
                                <div>
                                    <div className=" inputFlexBox justifyLeft" >
                                        <label className="text-secondary">نام محصول (فارسی):</label>
                                        <div >{product.farsiName}</div>
                                    </div>
                                </div>
                                <div>
                                    <div className=" inputFlexBox justifyLeft" >
                                        <label className="text-secondary">برند (فارسی):</label>
                                        <div >{product.brandName}</div>
                                    </div>
                                </div>
                                <div>
                                    <div className=" inputFlexBox justifyLeft" >
                                        <label className="text-secondary">قیمت:</label>
                                        <div >{product.price}</div>
                                    </div>
                                </div>

                            </div>
                            <div >
                                <p className="text-secondary">دسته بندی کالا</p>
                                <div ></div>
                            </div>

                            <div style={{ margin: "20px 0", display: "flex", flexDirection: "column" }}>
                                <span className="text-secondary">ویژگی های محصول:</span>
                                <ul>
                                    {product?.specifications?.map((item, i) => (
                                        <li key={i}>
                                            {item["key"]}:{item["value"]}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className=" inputFlexBox justifyRight" >
                                <label className="text-secondary">توصیف کوتاه (فارسی):</label>
                                <div >{product.shortDescription}</div>

                            </div>
                            <div className=" inputFlexBox justifyRight" >
                                <label className="text-secondary">توصیف (فارسی):</label>
                                <div >{product.description}</div>

                            </div>

                            <Button  style={{ float: "left", width: "100%", marginTop: "40px" }} type="button" >
                                <Link className="text-white" to={AppPath.Product}>بازگشت</Link>
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}