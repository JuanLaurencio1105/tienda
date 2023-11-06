import { createContext, useEffect, useState } from 'react'
import { useProductContext } from './ProductContext'

const CartContext = createContext()

const CartProvider = ({ children }) => {

  const storedCart = JSON.parse(localStorage.getItem('cart')) || []
  const [cartProducts, setCartProducts] = useState(storedCart)
  const [totalItemCart, setTotalItemsCart] = useState(storedCart.length)
  const { allProducts } = useProductContext()

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []
    const cartProductsData = allProducts.filter(product => storedCart.includes(product.id)).map(product => ({ ...product, quantity: 1 }))
    setCartProducts(cartProductsData)
    setTotalItemsCart(storedCart.length)

    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        const updateCart = JSON.parse(e.newValue) || []
        const updatedCartData = allProducts.filter(product => updateCart.includes(product.id)).map(product => ({ ...product, quantity: 1 }))
        setCartProducts(updatedCartData)
        setTotalItemsCart(updateCart.length)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [allProducts])

  const addCarrito = (productId) => {
    const updateCart = [...cartProducts, productId]
    setCartProducts(updateCart)
    localStorage.setItem('cart', JSON.stringify(updateCart))
    setTotalItemsCart(updateCart.length)
  }

  const removeItemCart = (productId) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []
    const updateCart = storedCart.filter(id => id !== productId)
    localStorage.setItem('cart', JSON.stringify(updateCart))
    setCartProducts(cartProducts.filter((product) => product.id !== productId))
    setTotalItemsCart(updateCart.length)
  }

  const increaseQuantity = (productId) => {
    setCartProducts((prevCartProducts) => {
      return prevCartProducts.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 }
        }
        return product
      })
    })
  }

  const decreaseQuantity = (productId) => {
    setCartProducts((prevCartProducts) => {
      return prevCartProducts.map((product) => {
        if (product.id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 }
        }
        return product
      })
    })
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        totalItemCart,
        addCarrito,
        removeItemCart,
        increaseQuantity,
        decreaseQuantity
      }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartContext, CartProvider }