import React, { useContext, useState } from 'react';
import MobileCartHeader from '../../components/cartHeaders/MobileCartHeader';
import MobileCartItemList from '../../components/cartItemsList/MobileCartItemList';

import './Cart.scss'
import CartFooter from '../../components/cartFooter/CartFooter';
import patchData from '../../Context/utils/patchData'
import CartContext from '../../Context/CartContext';

const Cart = () => {
  const context = useContext(CartContext)
  const items = context.cartItems
  const [cartTotal, setCartTotal] = useState(0)
  
  const increaseQuantityHandler = (id) => {
      const patchUrl = context.cartUrl += `${id}/`
      const data = {product: 1, quantity: 1}
      patchData(patchUrl, data).then(data => context.onUpdateCart(data))
    }
    
    const decreaseQuantityHandler = (id) => {
      const patchUrl = context.cartUrl += `${id}/`
      const data = {product: 1, quantity: -1}
      patchData(patchUrl, data).then(data => context.onUpdateCart(data))
    }

  return (
    <div className='mesh__cart section__padding'>
        <MobileCartHeader />
        <MobileCartItemList onReduceQuantity={decreaseQuantityHandler} onIncreaseQuantity={increaseQuantityHandler} items={items}/>
        <CartFooter total={context.cartTotal}/>
    </div>
  )
}

export default Cart