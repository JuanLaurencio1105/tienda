import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavLink from './NavLink'
import { AiOutlineAmazon } from 'react-icons/ai'
import { ClientContext } from '../context/ClientContext'
import Button from '../components/Button'
import { IoCartSharp } from 'react-icons/io5'
import useModal from '../hooks/useModal'
import Cart from '../components/Cart'
import { useProductContext } from '../context/ProductContext'
import { CartContext } from '../context/CartContext'

const NavBar = () => {

  const { client, logout } = useContext(ClientContext)
  const { isOpen, openModal, closeModal } = useModal()
  // const { allProducts } = useProductContext()
  // const [carrito, setCarrito] = useState([])

  // const removeItemCart = (productId) => {
  //   const storedCart = JSON.parse(localStorage.getItem('cart')) || []
  //   const updateCart = storedCart.filter(id => id !== productId)
  //   localStorage.setItem('cart', JSON.stringify(updateCart))
  //   setCarrito(carrito.filter((product) => product.id !== productId))
  //   // setTotalItemsCart(updateCart.length)
  // }

  // useEffect(() => {
  //   const cartStored = JSON.parse(localStorage.getItem('cart')) || []
  //   const cartProductsData = allProducts.filter(product => cartStored.includes(product.id))
  //   setCarrito(cartProductsData)
  // }, [])
  const [totalItemsCart, setTotalItemsCart] = useState(0)
  const [cartProducts, setCartProducts] = useState([])
  const { removeItemCart } = useContext(CartContext)
  const { allProducts } = useProductContext()


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []
    const cartProductsData = allProducts.filter(product => storedCart.includes(product.id)).map(product => ({ ...product, quantity: 1 }))
    setCartProducts(cartProductsData)
    setTotalItemsCart(storedCart.length)
  }, [allProducts])

  return (
    <header className='flex justify-between items-center px-4 py-2 bg-dark w-full'>
      {isOpen && (
        <Cart title='PRODUCTOS DEL CARRITO' closeModal={closeModal}>
          {cartProducts.length > 0 ? (
            <ul>
              {cartProducts.map((producto) => (
                <li key={producto.id} className='flex border-b py-1'>
                  <img src="#" alt="Imagen del producto" className='h-28 object-cover' />
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
                        <span className='bg-lime-300 border border-black inline-block py-1 px-2 rounded-md text-black font-extrabold '>S/.{producto.price}</span>
                      </div>
                    </article>
                    <button className='text-slate-700 text-sm underline hover:text-red-500' onClick={() => removeItemCart(producto.id)}>Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Carrito Vacio</p>
          )}
          {/* {
            carrito.length > 0 ? (
              <ul className='flex flex-col gap-4 p-4'>
                {carrito.map((productoId, index) => {
                  const product = allProducts.find(p => p.id === productoId)
                  return (
                    <li key={index} className='bg-white rounded-md py-2 px-4 flex justify-between'>
                      {product ? `${product.nameProduct} - S/. ${product.price}` : 'producto no encontrado'}
                      {productoId.nameProduct} - S/.{productoId.price}
                      <button className='text-black hover:text-red-500' onClick={() => removeItemCart(productoId.id)}>Eliminar</button>
                    </li>
                  )
                })}
                <Link to='/cart'>
                  <Button type='primary'>
                    Ir al carrito
                  </Button>
                </Link>
              </ul>
            ) : (
              <p>CARRITO VACIO</p>
            )
          } */}
        </Cart>
      )}
      <Link className=''>TIENDA ABARROTES</Link>
      <Button type='cart' total={totalItemsCart} onClick={openModal}>
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
        {
          !client ? (
            <Link to='/login/cli'>
              <Button
                type='primary'
              >
                INICIAR SESION
              </Button>
            </Link>

          ) : (
            <>
              <p>{client}</p>
              <Button
                onClick={logout}
                type='primary'
              >
                Cerrar Sesion
              </Button>
            </>
          )
        }
      </ul>

    </header>
  )
}

export default NavBar