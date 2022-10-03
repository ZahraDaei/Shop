import React from 'react'
import PropTypes from 'prop-types'
import { Link, useParams, useSearchParams } from "react-router-dom";

const Product = props => {
  const { categoryName } = useParams();
  console.log("hihaaaaa",categoryName)

  return (
    <div>index</div>
  )
}

Product.propTypes = {}

export default Product