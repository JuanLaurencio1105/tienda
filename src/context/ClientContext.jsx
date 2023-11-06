import { createContext, useEffect, useState } from 'react'

const ClientContext = createContext()

const ClientProvider = ({ children }) => {

  const getClient = JSON.parse(localStorage.getItem('client')) || []
  const [client, setClient] = useState(getClient)

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