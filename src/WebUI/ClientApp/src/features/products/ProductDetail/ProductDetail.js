import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Col, Row } from "react-bootstrap";
import ProductInfo from "./components/ProductInfo";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductById,
  selectLoadingProduct,
  selectProductById,
} from "../productSlice";
import ShoppingCartSection from "./components/ShoppingCartSection";
const ProductDetail = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProductById);
  const loading = useSelector(selectLoadingProduct);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id]);
    if (loading ) {
    return <div className="centerBox">در حال بارگزاری ...</div>;
  } else {
    return (
      <div>
        <Row style={{ padding: "0 40px" }}>
          <Col sm={12} lg={4}>
            <img
              src={`/images/${product.image}`}
              alt="MISSING JPG"
              style={{ maxWidth: "100%" }}
            />
          </Col>
          <Col sm={12} lg={5}>
            <ProductInfo product={product} />
          </Col>
          <Col sm={12} lg={3}>
            <ShoppingCartSection product={product} />
          </Col>
        </Row>
      </div>
    );
  }
};

ProductDetail.propTypes = {};

export default ProductDetail;
