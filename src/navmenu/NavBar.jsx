import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import NavLink from './NavLink'
import { AiOutlineAmazon } from 'react-icons/ai'
import Button from '../components/Button'
import { IoCartSharp } from 'react-icons/io5'
import useModal from '../hooks/useModal'
import Cart from '../components/Cart'
import { NewCartContext } from '../context/NewCartContext'
import { AuthContext } from '../context/AuthContextProvider'
import MenuUser from '../components/header/MenuUser'

const NavBar = () => {
  const { isOpen, openModal, closeModal } = useModal()
  const authContext = useContext(AuthContext)
  const cartContext = useContext(NewCartContext)

  return (
    <header className='flex justify-between items-center px-4 py-2 bg-dark w-full'>
      {isOpen && (
        <Cart title='PRODUCTOS DEL CARRITO' closeModal={closeModal}>
          {cartContext.cart.length <= 0 && (
            <div className='flex flex-col justify-center items-center gap-4'>
              <img
                src='/icons/empty.svg'
                alt='carrito sin productos'
                className='w-[60%]'
              />
              <p className='text-xl text-gray-600 font-bold'>
                No hay productos en el carrito
              </p>
            </div>
          )}

          {cartContext.cart.length > 0 && (
            <ul>
              {cartContext.cart.map((producto, index) => (
                <li key={producto.id}>
                  <div className='flex justify-start items-center gap-4'>
                    <img
                      src={producto.imageUrl ?? 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkaranzi.websites.co.in%2Fobaju-turquoise%2Fimg%2Fproduct-placeholder.png&f=1&nofb=1&ipt=68a69f71f60f6c31003a2fd0525cc0c53621063c0119dfe6dbb74a8eac7a8bba&ipo=images'}
                      alt="Imagen del producto"
                      className='h-28 w-64 rounded-md object-cover object-center'
                    />
                    <div className='w-full'>
                      <article className='flex justify-between'>
                        <div className='w-full'>
                          <h3 className='text-2xl font-medium'>{producto.nameProduct}</h3>
                          <p>{producto.description}</p>
                          <div className='flex gap-6 items-center py-2'>
                          </div>
                        </div>
                        <div className='flex items-center'>
                          {/* <p>S/. {producto.price} / por unidad</p> */}
                          <span className='bg-lime-300 border border-black inline-block py-1 px-2 rounded-md text-black font-extrabold'>
                            S/.{producto.price}
                          </span>
                        </div>
                      </article>
                      <button
                        className='text-slate-700 text-sm underline hover:text-red-500'
                        onClick={() => cartContext.removeFromCart({ productId: producto.id })}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>

                  {cartContext.cart.length - 1 !== index && (
                    <hr className='border-none w-full h-[1px] bg-gray-100 my-8' />
                  )}
                </li>
              ))}
            </ul>
          )}
        </Cart>
      )}
      <div className='flex gap-4'>
        <Link className=''>TIENDA ABARROTES</Link>
        <Link className='' to={'/clientes'}>INICIAR COMO ADMINISTRADOR</Link>
      </div>
      <Button type='cart' total={cartContext.cartLength} onClick={openModal}>
        <IoCartSharp size={25}></IoCartSharp>
      </Button>
      <ul className='flex justify-center items-center gap-4'>
        <NavLink
          text='Productos'
          to='/'
          icon={<AiOutlineAmazon size={20} />}
        />
        <NavLink
          text='Nosotros'
          to='/nosotros'
          icon={<AiOutlineAmazon size={20} />}
        />
        <NavLink
          text='Productos'
          to='/elementos'
          icon={<AiOutlineAmazon size={20} />}
        />
        <NavLink
          text='Carrito'
          to='/cart'
          icon={<AiOutlineAmazon size={20} />}
        />
        <li>
          <MenuUser />
        </li>
      </ul>

    </header>
  )
}

export default NavBar
