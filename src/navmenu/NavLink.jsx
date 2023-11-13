import React from 'react'
import { Link, useHref, useLocation } from 'react-router-dom'

const NavLink = ({ to, text, icon }) => {
  const locacion = useLocation()
  const path = locacion.pathname === to ? 'active' : ''
  const href = useHref()

  return (
    <li>
      <Link
        to={to}
        active={path}
        className='w-full flex items-center justify-start gap-2 p-2 link'
      >
        <span className={`${href === to ? 'text-lightGreen' : ''}`}>{icon}</span>
        <span className={`${href === to ? 'text-lightGreen' : ''}`}>{text}</span>
      </Link>
    </li>
  )
}

export default NavLink