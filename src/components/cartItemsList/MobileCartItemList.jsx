import React, { useContext } from 'react'
import CartContext from '../../Context/CartContext'
import MobileCartItem from './MobileCartItem'
import './MobileCartItemList.scss'

const MobileCartItemList = ({items, onIncreaseQuantity, onReduceQuantity}) => {
    const context = useContext(CartContext)
    

  return (
    <div className='mesh__cart-mobileCartItemList'>
        {context.cartLength == 0 && <h4>You haven't selected any items yet.</h4>}
        {context.cartLength > 0 && 
            items.map((item) => {
                return (
                    <MobileCartItem 
                    title={item.product.title}
                    price={item.product.price}
                    image={item.product.images}
                    quantity={item.quantity}
                    totalPrice={item.total_price}
                    onIncreaseQuantity={onIncreaseQuantity}
                    onReduceQuantity={onReduceQuantity}
                    id={item.product.id}
                    key={item.product.id}/>
                )
            })
        }
    </div>
  )
}

export default MobileCartItemList