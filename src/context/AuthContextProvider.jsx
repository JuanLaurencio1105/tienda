import { createContext, useState } from 'react'
import { LocalStorageKeys } from '../utils/constants'
import { Role } from '../utils/constants'

const AuthContext = createContext({})

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const clientStorage = JSON.parse(localStorage.getItem(LocalStorageKeys.AUTH) ?? 'null')
      if (!clientStorage) {
        throw new Error('No existe usuario almacenado en localStorage()')
      }
      return clientStorage ?? null
    } catch (error) {
      console.error(error)
      return null
    }
  })

  const loginClient = ({ client }) => {
    const newUser = {
      username: client,
      role: Role.CLIENT
    }
    localStorage.setItem(LocalStorageKeys.AUTH, JSON.stringify(newUser))
    setUser(newUser)
  }

  const loginUser = ({ user }) => {
    const newUser = {
      username: user,
      role: Role.ADMIN
    }
    localStorage.setItem(LocalStorageKeys.AUTH, JSON.stringify(newUser))
    setUser(newUser)
  }

  const logout = () => {
    localStorage.removeItem(LocalStorageKeys.AUTH)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        loginClient,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthContextProvider
}
