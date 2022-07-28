import React from "react";

const CartContext = React.createContext({
  onUpdateCart: () => {},
  cartLength: 0,
  cartItems: [],
  setCartItems: () => {},
  cartUrl: "",
  cartTotal: 0,
  setCartTotal: () => {},
  cartPath: ''
});

export default CartContext;
