import React from 'react'
import PropTypes from 'prop-types'
import { NavItem } from 'react-bootstrap'
import {useDispatch,useSelector} from "react-redux"
import {addShoppingCart,removeShoppingCart} from "../shoppingCartSlice"
//import { ReactSVG } from 'react-svg'
import { ImBin } from 'react-icons/im';


const CartNumber = ({item}) => {
    var dispatch=useDispatch();

  return (<div className='inc-dec-handler d-flex justify-content-around mt-3'>
      <span onClick={()=>dispatch(addShoppingCart(item.product))} className='inc'>+</span>
    <span >{item.number}</span>
    <span onClick={()=>dispatch(removeShoppingCart(item.product))} className='dec'>
          {item.number === 1 ? <ImBin />:'-'}
      </span>
  </div>
  )
}

CartNumber.propTypes = {}

export default CartNumber