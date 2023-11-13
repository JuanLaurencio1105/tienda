import React, { useContext, useEffect, useState } from 'react'
// import axios from '../api/axios'
import Button from '../components/Button'
import NavBar from '../navmenu/NavBar'
// import { IoCartSharp } from 'react-icons/io5'
// import useModal from '../hooks/useModal'
// import Cart from '../components/Cart'
import { useProductContext } from '../context/ProductContext'
// import { Link, useAsyncError } from 'react-router-dom'
// import { CartContext } from '../context/CartContext'
import { NewCartContext } from '../context/NewCartContext'
import { BsCart4, BsCartX } from 'react-icons/bs'

const Dashboard = () => {

  const [totalItemsCart, setTotalItemsCart] = useState(0)
  // const { isOpen, openModal, closeModal } = useModal()
  const { allProducts } = useProductContext()
  const cartContext = useContext(NewCartContext)

  // const [carrito, setCarrito] = useState([])

  // const getProducts = async () => {
  //   try {
  //     await axios.get('productos')
  //     const storedCart = JSON.parse(localStorage.getItem('cart')) || []
  //     setCarrito(storedCart)
  //     // console.log(response.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const addCarrito = (productoId) => {
  //   const updateCart = [...carrito, productoId]
  //   setCarrito(updateCart)
  //   localStorage.setItem('cart', JSON.stringify(updateCart))
  //   setTotalItemsCart(updateCart.length)
  // }

  // const removeItemCart = (productId) => {
  //   const updateCart = carrito.filter(productoId => productoId !== productId)
  //   setCarrito(updateCart)
  //   localStorage.setItem('cart', JSON.stringify(updateCart))
  //   setTotalItemsCart(updateCart.length)
  // }

  useEffect(() => {
    // getProducts()
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []
    setTotalItemsCart(storedCart.length)
  }, [])

  return (
    <div className='bg-[#F1F0E8]'>
      {/* {isOpen && (
        <Cart title='PRODUCTOS DEL CARRITO' closeModal={closeModal}>
          {
            carrito.length > 0 ? (
              <ul className='flex flex-col gap-4 p-4'>
                {carrito.map((productoId, index) => {
                  const product = allProducts.find(p => p.id === productoId)
                  return (
                    <li key={index} className='bg-white rounded-md py-2 px-4 flex justify-between'>
                      {product ? `${product.nameProduct} - S/. ${product.price}` : 'producto no encontrado'}
                      <button className='text-black hover:text-red-500' onClick={() => removeItemCart(productoId)}>Eliminar</button>
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
          }
        </Cart>
      )} */}
      <NavBar />
      {/* <div className='bg-green'>
        <Button type='cart' total={totalItemsCart} onClick={openModal}>
          <IoCartSharp size={25}></IoCartSharp>
        </Button>
      </div> */}
      <section>
        <div className='mt-4 px-10'>
          <h2 className='text-center text-3xl font-bold'>LISTA DE PRODUCTOS</h2>
          <ul className='grid grid-cols-4 gap-4 mt-9'>
            {allProducts.map((producto, index) => (
              <li className='flex flex-col bg-white p-4 rounded-xl'
                key={index}>
                <img
                  src={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkaranzi.websites.co.in%2Fobaju-turquoise%2Fimg%2Fproduct-placeholder.png&f=1&nofb=1&ipt=68a69f71f60f6c31003a2fd0525cc0c53621063c0119dfe6dbb74a8eac7a8bba&ipo=images'}
                  alt="Imagen del producto"
                  className='h-36 w-52 mx-auto rounded-md object-cover object-center'
                />
                <p className='text-center mt-4 font-bold text-xl'>{producto.nameProduct}</p>
                <div>
                  <p>{producto.description}</p>
                  <div className='flex justify-between mt-2'>
                    <p className='text-sm'>Precio: <span className='bg-lime-300 border border-black px-2 py-1 rounded-md text-black font-medium text-lg'>S./ {producto.price.toFixed(2)}</span></p>
                    <p className='text-sm'>Stock: <span className='bg-red-200 border border-black px-2 py-1 rounded-md text-black font-medium text-lg'>{producto.stock} uds.</span></p>
                  </div>
                </div>
                {/* <div className='flex justify-between'>
                  <p></p>
                  <span></span>
                </div> */}

                <div className='mt-4 mx-auto'>
                  {cartContext.findItemInCart({ productId: producto.id }) && (
                    <Button
                      type='danger'
                      onClick={() => cartContext.removeFromCart({ productId: producto.id })}
                    >
                      <p className='font-medium flex items-start gap-2'>
                        <span>ELIMINAR DEL CARRITO</span>
                        <BsCartX size={20} />
                      </p>
                    </Button>
                  )}

                  {!cartContext.findItemInCart({ productId: producto.id }) && (
                    <Button
                      type='primary'
                      onClick={() => cartContext.addToCart({ product: producto })}
                    >
                      <p className='font-medium flex items-start gap-2'>
                        <span>AGREGAR AL CARRITO</span>
                        <BsCart4 size={20} />
                      </p>
                    </Button>
                  )}
                </div>
              </li>
            ))
            }
          </ul>
        </div>
      </section>
    </div>
  )
}

export default Dashboard