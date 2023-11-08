import { createContext, useEffect, useState } from 'react'
import { LocalStorageKeys } from '../utils/constants'

const NewCartContext = createContext({})

const NewCartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const cartItemStorage = JSON.parse(localStorage.getItem(LocalStorageKeys.CART) ?? 'null')
      if (!cartItemStorage) {
        throw new Error('No hay elementos en el carrito :(')
      }

      return cartItemStorage ?? []
    } catch (error) {
      console.error(error)
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(LocalStorageKeys.CART, JSON.stringify(cart))
  }, [cart])

  const addToCart = ({ product }) => {
    const newProduct = {
      ...product,
      quantity: 1
    }
    setCart(cart.concat(newProduct))
  }

  const incrementQuantity = ({ productId }) => {
    setCart(prevState => {
      return prevState.map(item => {
        if (item.id === productId) {
          return {
            ...item,
            stock: item.stock + 1,
            quantity: item.quantity + 1
          }
        }
        return item
      })
    })
  }

  const decrementQuantity = ({ productId }) => {
    setCart(prevState => {
      return prevState.map(item => {
        if (item.id === productId) {
          return {
            ...item,
            stock: item.stock - 1,
            quantity: item.quantity - 1
          }
        }
        return item
      })
    })
  }

  const removeFromCart = ({ productId }) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const findItemInCart = ({ productId }) => {
    return cart.find(product => product.id === productId) ?? null
  }

  return (
    <NewCartContext.Provider
      value={{
        cart,
        cartLength: cart.length,
        addToCart,
        findItemInCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity
      }}
    >
      {children}
    </NewCartContext.Provider>
  )
}

export {
  NewCartContext,
  NewCartProvider
}
