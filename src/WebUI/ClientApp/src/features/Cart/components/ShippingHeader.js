import React from 'react'
import PropTypes from 'prop-types'
import { ReactSVG } from 'react-svg'

const ShippingHeader = ({step}) => {
  return (
    <div className="border radious  p-3 text-center">
        <h2 className="mb-3 redColor">توپ بزن</h2>
        <div className=" d-flex justify-content-center">
          <span className="d-flex">
                  <div className={step === "cart" ? "iconColorRed d-flex" : "iconColorPink d-flex"} >
              <ReactSVG src="/SVG/cart.svg" />
              <span className="mr-2">سبد خرید</span>
            </div>
          </span>
          <span className="d-flex">
                  <div className={step === "shipping" ? "iconColorRed connectPink d-flex" : step === "cart" ? "iconColorGrey connectGrey d-flex" :"iconColorPink connectPink d-flex"} >
              <ReactSVG src="/SVG/truck.svg" />
              <span className="mr-2">زمان ارسال</span>
            </div>
          </span>
          <span className="d-flex">
                  <div className={step === "payment" ? "iconColorRed connectPink d-flex": "iconColorGrey connectGrey d-flex"   }>
              <ReactSVG src="/SVG/wallet.svg" />
              <span className="mr-2">پرداخت</span>
            </div>
          </span>
        </div>
      </div>
  )
}

ShippingHeader.propTypes = {}

export default ShippingHeader