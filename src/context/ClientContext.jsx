import { createContext, useEffect, useState } from 'react'
import { LocalStorageKeys } from '../utils/constants'

const ClientContext = createContext()

const ClientProvider = ({ children }) => {
  const [client, setClient] = useState(() => {
    try {
      const data = JSON.parse(localStorage.getItem(LocalStorageKeys.CLIENT))
      return data ? data : null
    } catch (error) {
      return null
    }
  })

  useEffect(() => {
    const savedClient = JSON.parse(localStorage.getItem('client'))
    if (savedClient) {
      setClient(savedClient)
    }
  }, [])

  const login = (clientData) => {
    localStorage.setItem('client', JSON.stringify(clientData))
    setClient(clientData)
  }

  const logout = () => {
    localStorage.removeItem('client')
    setClient(null)
  }

  return (
    <ClientContext.Provider value={{ client, login, logout }}>
      {children}
    </ClientContext.Provider>
  )
}

export { ClientContext, ClientProvider }
