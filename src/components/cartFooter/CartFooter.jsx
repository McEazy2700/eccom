import React from 'react'
import { Link } from 'react-router-dom'
import './CartFooter.scss'

const CartFooter = ({ total }) => {
  return (
    <div className='mesh__cart-footer'>
      <div className="mesh__cart-footer_total">
        <p>Sum Total</p>
        <p><strong>&#8358;{total}</strong></p>
      </div>
      <div className="mesh__cart-footer_cta">
        <Link to="/checkout"><button>Checkout</button></Link>
      </div>
    </div>
  )
}

export default CartFooter