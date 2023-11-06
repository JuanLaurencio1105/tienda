import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserContext'


const ProtectedRoute = ({ children }) => {

  const { user } = useContext(UserContext)

  if (!user) {
    return <Navigate to='/login' />
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute