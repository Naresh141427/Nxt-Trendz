import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  increaseCartProductCount: () => {},
  decreaseCartProductCount: () => {},
})

export default CartContext
