import React, { useContext } from 'react'
import './MobileCartHeader.scss'
import { BiArrowBack } from 'react-icons/bi'
import { FiShoppingBag } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import CartContext from '../../Context/CartContext'

const MobileCartHeader = () => {
    const context = useContext(CartContext)
  return (
    <>
        <div className='mesh__cart-header'>
            <div className="mesh__cart-header_backButton">
                <Link to="/store"><BiArrowBack size={27}/></Link>
            </div>
            <div className="mesh__cart-header_title">
                <h2>Shopping Cart</h2>
            </div>
            <div className="mesh__cart-header_shoppingBag">
                <span className="mesh__cart-header_shoppingBag-quantity">
                    { context.cartLength}
                </span>
                <FiShoppingBag className='mesh__cart-header_shoppingBag-bag' size={27}/>
            </div>
        </div>
        <div className="mesh__cart-header_items">
            <p>{context.cartLength} Items</p>
        </div>
    </>
  )
}

export default MobileCartHeader