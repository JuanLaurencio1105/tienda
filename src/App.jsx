import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { UserProvider } from './context/UserContext'
import { ProductProvider } from './context/ProductContext'
import Router from './router/Router'
import NavBar from './navmenu/NavBar'
import { ClientProvider } from './context/ClientContext'
import { CartProvider } from './context/CartContext'
function App() {

  return (
    <ClientProvider>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </ClientProvider>
  )
}

export default App
