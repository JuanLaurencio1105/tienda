import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { AuthContext } from '../context/AuthContextProvider'


const ProtectedRoute = ({ children }) => {

  // const authContext = useContext(AuthContext)
  const { user } = useContext(UserContext)

  if (!user) {
    return <Navigate to='/login' />
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute