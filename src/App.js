import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  increaseCartProductCount = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(product => {
      if (product.id === id) return {...product, quantity: product.quantity + 1}
      return product
    })
    this.setState({cartList: updatedCartList})
  }

  decreaseCartProductCount = id => {
    const {cartList} = this.state
    let updatedCartList = null
    const existingCartItem = cartList.find(cartItem => cartItem.id === id)

    if (existingCartItem.quantity === 1) {
      updatedCartList = cartList.filter(cartItem => cartItem.id !== id)
    } else {
      updatedCartList = cartList.map(cartItem =>
        cartItem.id === id
          ? {...cartItem, quantity: cartItem.quantity - 1}
          : cartItem,
      )
    }

    this.setState({cartList: [...updatedCartList]})
  }

  filterCartItemsOnRemoving = id => {
    const {cartList} = this.state
    return cartList.filter(product => product.id !== id)
  }

  addCartItem = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
  }

  deleteCartItem = id => {
    const filteredCartItemsList = this.filterCartItemsOnRemoving(id)
    this.setState({cartList: filteredCartItemsList})
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            increaseCartProductCount: this.increaseCartProductCount,
            decreaseCartProductCount: this.decreaseCartProductCount,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
