import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Router from './router/Router'
import { ProductProvider } from './context/ProductContext'
import { CartProvider } from './context/CartContext'
import { NewCartProvider } from './context/NewCartContext'
import { AuthContextProvider } from './context/AuthContextProvider'

function App() {
  return (
    <AuthContextProvider>
      <ProductProvider>
        <NewCartProvider>
          <CartProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </CartProvider>
        </NewCartProvider>
      </ProductProvider>
    </AuthContextProvider>
  )
}

export default App
