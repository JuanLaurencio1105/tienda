import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import {
  AiOutlineDollar,
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlineUser
} from 'react-icons/ai'
import NavLink from './NavLink'
const SideBar = () => {

  const [isOpen, setIsOpen] = useState(true)

  const toggleSideBar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {isOpen && (
        <header className='text-white bg-darkPrimary h-full flex flex-col justify-start gap-4 px-4 py-5 w-48 min-h-screen lg:w-64 border-r border-darkSecondary'>
          <div className='w-full flex justify-between items-center animate-duration-500 animate-ease-linear py-1'>
            <Link>
              <p className='text-xl font-semibold'>DASHBOARD</p>
            </Link>
            <Button
              type='menu'
              onClick={toggleSideBar}
            >
              <AiOutlineMenu />
            </Button>
          </div>
          <hr />
          <p className='text-xs'>contenido</p>
          <ul>
            <NavLink
              to='/dashboard'
              text='DASHBOARD'
              icon={<AiOutlineDollar size={23} />}
            />
            <NavLink
              to='/clientes'
              text='CLIENTES'
              icon={<AiOutlineUser size={23} />}
            />
            <NavLink
              to='/usuarios'
              text='USUARIOS'
              icon={<AiOutlineHome size={23} />}
            />
            <NavLink
              to='/productos'
              text='PRODUCTOS'
              icon={<AiOutlineHome size={23} />}
            />
            <NavLink
              to='/pedidos'
              text='PEDIDOS'
              icon={<AiOutlineHome size={23} />}
            />
          </ul>
        </header>
      )}
      {
        !isOpen && (
          <Button
            type='menu-hidden'
            onClick={toggleSideBar}
          >
            <AiOutlineMenu />
          </Button>
        )
      }
    </>
  )
}

export default SideBar