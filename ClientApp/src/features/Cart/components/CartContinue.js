
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';

import {  selectTotal } from '../shoppingCartSlice';
import { Link } from 'react-router-dom';
const CartContinue = props => {
  var total = useSelector(selectTotal);

  return (
    <div className='border m-2 p-4'>
      <div className="d-flex justify-content-between mt-3">
      <span>قیمت کالاها</span>
      <span className='price'>{total}</span>
      </div>
      <div className="d-flex justify-content-between mt-3">
      <span>جمع سبد خرید</span>
      <span className='price'>{total}</span>
      </div>
        <p className='d-flex justify-content-center mt-4 '>
            <Button className="btn-block" variant="danger"><Link to="/checkout/shipping">ادامه</Link></Button>
        </p>
    </div>
  )
}

CartContinue.propTypes = {}

export default CartContinue