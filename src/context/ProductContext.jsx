import { createContext, useContext, useEffect, useState } from 'react'
import axios from '../api/axios'

const ProductContext = createContext()

export const useProductContext = () => {
  return useContext(ProductContext)
}

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([])

  const getProducts = async () => {
    try {
      const response = await axios.get('productos')
      setAllProducts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <ProductContext.Provider value={{ allProducts, setAllProducts }}>
      {children}
    </ProductContext.Provider>
  )
}