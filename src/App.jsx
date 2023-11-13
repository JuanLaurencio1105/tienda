import Router from './router/Router'
import { BrowserRouter } from 'react-router-dom'
import { ProductProvider } from './context/ProductContext'
import { NewCartProvider } from './context/NewCartContext'
import { AuthContextProvider } from './context/AuthContextProvider'
import { UserProvider } from './context/UserContext'
import './App.css'

function App() {
  return (
    <UserProvider>
      <AuthContextProvider>
        <ProductProvider>
          <NewCartProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </NewCartProvider>
        </ProductProvider>
      </AuthContextProvider>
    </UserProvider>
  )
}

export default App
