import React from 'react'
import PropTypes from 'prop-types'
import CartNumber from './CartNumber';

const Basket = ({shoppingCartProducts}) => {
  return (
      <>
    {shoppingCartProducts.map((item, i) => {
        return (
          <div className="productCart d-flex flex-row ">
            <div className="shoppingCartImg">
              <img className="imgWidth mt-2" src={`/images/${item.product.image}`} />
              <CartNumber item={item} />
            </div>
            <div className=" p-3">
              <span>{item.product.farsiName}</span>
              <ul>
                {item.product.specifics?.map((item, i) => (
                  <li key={i}>
                    {item["key"]}:{item["value"]}
                  </li>
                ))}
                <span className="price">{item.product.price}</span>
              </ul>
            </div>
          </div>
        );
    })}
    </>
  )
}

Basket.propTypes = {}

export default Basket