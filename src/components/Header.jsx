import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import Button from './Button'
import { CgProfile } from 'react-icons/cg'
import { LuPanelRightClose } from 'react-icons/lu'
import { FiChevronRight } from 'react-icons/fi'
// import { AuthContext } from '../context/AuthContextProvider'

const Header = () => {
  // const authContext = useContext(AuthContext)
  const { user, logout } = useContext(UserContext)

  const [openMenu, setOpenMenu] = useState(false)

  useEffect(() => {
    const closeMenu = () => setOpenMenu(false)

    window.addEventListener('mousedown', closeMenu)
    return () => (window.removeEventListener('mousedown', closeMenu))
  }, [])

  const toggleOpenMenu = () => {
    setOpenMenu(!openMenu)
  }


  return (
    <div className='bg-darkPrimary px-5 py-5 text-white flex justify-end items-center gap-2 border-b border-gray-500'>
      <span className='bg-white text-black font-extrabold text-lg rounded-full w-6 h-6 flex justify-center items-center'>A</span>
      <button
        onClick={toggleOpenMenu}
        className='bg-darkSecondary flex justify-center items-center gap-1 px-2 py-2 rounded-md text-sm uppercase text-white hover:bg-slate-600'
      >
        {user}
        <FiChevronRight />
      </button>
      {openMenu && (
        <nav onMouseDown={(e) => e.stopPropagation()}
          className='fixed top-16 right-8 z-50 bg-darkSecondary text-white px-4 py-2 rounded-md border border-gray-400'>
          <ul>
            <li className='flex justify-start items-center gap-2 px-4 py-2 rounded-md hover:bg-slate-600'>
              <CgProfile />
              <span>
                Mi perfil
              </span>
            </li>
            <hr />
            <li>
              <button
                onClick={logout}
                className='flex justify-start items-center gap-2 px-4 py-2 rounded-md hover:bg-slate-600'
              >
                <LuPanelRightClose />
                <span>
                  Cerrar sesión
                </span>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}

export default Header