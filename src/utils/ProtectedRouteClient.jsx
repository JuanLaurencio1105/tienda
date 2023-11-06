// import React, { useContext } from 'react'
// import { Navigate, Outlet, Route } from 'react-router-dom'
// import { UserContext } from '../context/UserContext'


// const ProtectedRoute = ({ children }) => {

//   const { user } = useContext(UserContext)

//   if (!user) {
//     return <Navigate to='/login' />
//   }

//   return children ? children : <Outlet />
//   // return user ? <Outlet /> : <Navigate to='/login' replace />
// }

// export default ProtectedRoute