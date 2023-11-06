import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavLink = ({ to, text, icon }) => {

  const locacion = useLocation()

  const path = locacion.pathname === to ? 'active' : ''
  return (
    <li>
      <Link
        to={to}
        active={path}
        className='w-full flex items-center justify-start gap-4 p-2 link'
      >
        {icon}
        <span>{text}</span>
      </Link>
    </li>
  )
}

export default NavLink