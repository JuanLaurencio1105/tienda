import { createContext, useEffect, useState } from 'react';

const UserContext = createContext()

const UserProvider = ({ children }) => {

  const getUser = JSON.parse(localStorage.getItem('user')) || null
  const [user, setUser] = useState(getUser)

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'))
    if (savedUser) {
      setUser(savedUser)
    }
  }, [])

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }