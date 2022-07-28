import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import CartContext from '../../Context/CartContext';
import './CTA.scss'

const CTA = () => {
    const context = useContext(CartContext)
  return (
    <>
        {/* <div><Link className='btn btn-transparent' to="sign_in">Sign in</Link></div>
        <div><Link className='btn' to="sign_up">Sign up</Link></div> */}
        <div className="mesh__navbar-menu_cart">
            <Link to='/cart'><FiShoppingCart size={27}/> <span>{context.cartLength}</span></Link>
        </div>
    </>
  )
}

export default CTA