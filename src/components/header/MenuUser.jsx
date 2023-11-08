import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContextProvider'
import { LuPanelRightClose } from 'react-icons/lu'
import { CgProfile } from 'react-icons/cg'


const MenuUser = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const authContext = useContext(AuthContext)

  useEffect(() => {
    const closeMenu = () => setIsOpenMenu(false)

    window.addEventListener('mousedown', closeMenu)

    return () => window.removeEventListener('mousedown', closeMenu)
  }, [])

  const toggleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  return (
    <div>
      {authContext.user && (
        <button
          onClick={toggleOpenMenu}
          className='bg-blue-800 px-6 py-2 rounded-md text-sm uppercase text-white hover:bg-blue-600'
        >
          {authContext.user?.username}
        </button>
      )}
      {!authContext.user && (
        <Link
          to='/login/cli'
          className='bg-slate-600 px-6 py-2 rounded-md text-white hover:bg-slate-400 transition-colors duration-200'
        >
          Iniciar sesión
        </Link>
      )}

      {isOpenMenu && (
        <nav
          onMouseDown={(event) => event.stopPropagation()}
          className='fixed top-16 right-8 z-50 bg-slate-800 text-white px-4 py-2 rounded-md'
        >
          <ul>
            <li className='flex justify-start items-center gap-2 px-4 py-2 rounded-md hover:bg-slate-600'>
              <CgProfile />
              <span>
                Mi perfil
              </span>
            </li>
            <li>
              <button
                onClick={authContext.logout}
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

export default MenuUser
