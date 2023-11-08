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
    <div>
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
        <div className='mt-4 px-10 bg-red-300'>
          <h2 className='text-center'>LISTA DE PRODUCTOS</h2>
          <ul className='grid grid-cols-3 gap-4 mt-9'>
            {allProducts.map((producto, index) => (
              <li className='flex flex-col bg-green p-4 rounded-xl'
                key={index}>
                {producto.nameProduct} - S/.{producto.price.toFixed(2)}
                <span>{producto.description} - stock {producto.stock}</span>

                <div className='mt-4'>
                  {cartContext.findItemInCart({ productId: producto.id }) && (
                    <Button
                      type='danger'
                      onClick={() => cartContext.removeFromCart({ productId: producto.id })}
                    >
                      ELIMINAR DEL CARRITO
                    </Button>
                  )}

                  {!cartContext.findItemInCart({ productId: producto.id }) && (
                    <Button
                      type='primary'
                      onClick={() => cartContext.addToCart({ product: producto })}
                    >
                      AGREGAR AL CARRITO
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
