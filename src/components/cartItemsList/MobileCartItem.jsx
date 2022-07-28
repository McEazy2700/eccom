import React from 'react'
import './MobileCartItem.scss'

const MobileCartItem = ({id, title, price, image, quantity, totalPrice, onIncreaseQuantity, onReduceQuantity}) => {
    const increaseQuantity = () => {
        return onIncreaseQuantity(id)
    }

    const reduceQuantity = () => {
        return onReduceQuantity(id)
    }
  return (
    <div className='mesh__cart-mobileCartItemList_item'>
        <div className="mesh__cart-mobileCartItemList_item-image">
            <img src={image[0].image} alt={title} />
        </div>
        <div className="mesh__cart-mobileCartItemList_item-details">
            <h3>{title}</h3>
            <p><strong>&#8358;{price}</strong></p>
        </div>
        <div className="mesh__cart-mobileCartItemList_item-calcs">
            <p><strong>&#8358;{totalPrice}</strong></p>
            <div className="mesh__cart-mobileCartItemList_item-calcs_quantity">
                <div onClick={reduceQuantity} className="subtract__quantity">-</div>
                <div className="current__quantity">{quantity}</div>
                <div onClick={increaseQuantity} className="add__quantity">+</div>
            </div>
        </div>
    </div>
  )
}

export default MobileCartItem