import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Button from './Button'

const Header = () => {
  const { user, logout } = useContext(UserContext)

  return (
    <div className='bg-green p-5 px flex justify-end items-center gap-6'>
      <p>Bienvenido: <span className='bg-orange-500 p-2 rounded-md font-medium'>{user}</span></p>
      <Button
        type='primary'
        onClick={logout}
      >
        LOGOUT
      </Button>
    </div>
  )
}

export default Header