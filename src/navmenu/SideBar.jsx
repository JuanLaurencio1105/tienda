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
        <header className='text-dark bg-red-400 h-screen flex flex-col justify-start gap-4 p-4 w-48 min-h-full lg:w-56'>
          <div className='w-full flex justify-between items-center animate-duration-500 animate-ease-linear py-2'>
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
          <p className='text-sm '>contenido</p>
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
              to='/inicio'
              text='INICIO'
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
            {/* {pages.map((page, index) => (
              <li key={page}>
                <NavLink
                  to={page}
                  text={page}
                  icon={React.createElement(icons[index], { size: 25 })}
                />
              </li>
            ))} */}
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