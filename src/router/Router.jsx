import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../utils/ProtectedRoute'
import Dashboard from '../views/Dashboard'
import Clients from '../views/pages/clientes/Clients'
import Login from '../auth/Login'
import Home from '../views/pages/Home'
import Products from '../views/pages/productos/Products'
import Pedidos from '../views/pages/pedidos/Pedidos'
import AboutUs from '../views/pages/nosotros/AboutUs'
import Carrito from '../views/pages/carrito/Carrito'
import LoginClient from '../auth/LoginClient'

const Router = () => {

  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/login' Component={Login} />
      <Route path='/login/cli' Component={LoginClient} />
      <Route path='/nosotros' element={<AboutUs />} />
      <Route path='/cart' element={<Carrito />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/clientes' element={<Clients />} />
        <Route path='/inicio' element={<Home />} />
        <Route path='/productos' element={<Products />} />
        <Route path='/pedidos' element={<Pedidos />} />
      </Route>
    </Routes>
  )
}

export default Router