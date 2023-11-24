import React, { useEffect, useState } from "react";
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
    const [bigImg, setBigImg] = useState(product?.images[0]);

    useEffect(() => {
        dispatch({ type: "GET_PRODUCT_BY_ID_START", payload: id })
    }, [])
    if (loading) {
        return <Spinner animation="border" variant="primary" />
    } else {

        return (
            <Row style={{ padding: "0 40px" }}>
                <Col sm={12} lg={4} >
                    <div style={{ height: '80%' }}>
                        <div style={{ width: "100%", padding: "10px 30px", height: '100%' }}>
                            <img
                                style={{ width: '100%', height: '100%' }}
                                src={`/images/product/${bigImg}`}
                            />
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            height: '100px',
                            cursor: 'point',
                            width: '100%',
                            overflowY: 'scroll'
                        }}>
                            {product.images.map((img, index) => <div style={{ width: "20%", height: '100%' }}>
                                <img
                                    onClick={() => setBigImg(img)}
                                    key={index}
                                    src={`/images/product/${img}`}
                                    alt={product.name}
                                    style={{ width: "100%", height: '100%', cursor: 'pointer' }}
                                />
                            </div>)}
                        </div>
                    </div>
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

                            <Button style={{ float: "left", width: "100%", marginTop: "40px" }} type="button" >
                                <Link className="text-white" to={AppPath.Product}>بازگشت</Link>
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}