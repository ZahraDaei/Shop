import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';

import { addShoppingCart } from '../../../Cart/shoppingCartSlice';
const ShoppingCartSection = ({product}) => {
var dispatch=useDispatch();
    const shoppingCart=()=>{
        dispatch(addShoppingCart(product));
    }
  return (
    <div className='shoppingCartSection'>
        <p className='d-flex justify-content-center p-5'>
            <Button onClick={shoppingCart} variant="danger">افزودن به سبد</Button>
        </p>
    </div>
  )
}

ShoppingCartSection.propTypes = {}

export default ShoppingCartSection