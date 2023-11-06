import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../../../navmenu/NavBar'
import Button from '../../../components/Button'
import { Link } from 'react-router-dom'
import { useProductContext } from '../../../context/ProductContext'
import { IoAdd, IoArrowBack, IoCardSharp, IoRemove } from 'react-icons/io5'
import { ClientContext } from '../../../context/ClientContext'
import { CartContext } from '../../../context/CartContext'

const Carrito = () => {

  const { removeItemCart, totalItemsCart } = useContext(CartContext)
  const { client } = useContext(ClientContext)
  // const [totalItemsCart, setTotalItemsCart] = useState(0)
  const [cartProducts, setCartProducts] = useState([])
  const { allProducts } = useProductContext()


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []
    const cartProductsData = allProducts.filter(product => storedCart.includes(product.id)).map(product => ({ ...product, quantity: 1 }))
    setCartProducts(cartProductsData)
    // setTotalItemsCart(storedCart.length)
  }, [allProducts])

  const calcularTotal = () => {
    let total = 0

    for (const producto of cartProducts) {
      total += producto.price * producto.quantity
    }
    return total.toFixed(2)
  }

  const increaseQuantity = (productId) => {
    setCartProducts((prevCartProducts) => {
      return prevCartProducts.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 }
        }
        return product
      })
    })
  }

  const decreaseQuantity = (productId) => {
    setCartProducts((prevCartProducts) => {
      return prevCartProducts.map((product) => {
        if (product.id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 }
        }
        return product
      })
    })
  }

  return (
    <div>
      <NavBar />
      <section className='px-20 mt-20'>
        <div className='w-28'>
          <Link to='/'>
            <Button type='primary'>
              <IoArrowBack />
              Volver
            </Button>
          </Link>
        </div>
        <h4 className='text-3xl py-4'>Confirmar y Pagar</h4>
        <div className='flex gap-6'>
          <section className='flex flex-col gap-2 w-full'>
            <p className='card text-black font-medium'>Resumen del pedido ({totalItemsCart})</p>
            <div className='card text-black'>
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
                              <Button type='menu'
                                onClick={() => decreaseQuantity(producto.id)}
                              >
                                <IoRemove size={30} />
                              </Button>
                              <p>Cantidad: <span className='bg-lime-300 border border-black px-2 py-1 rounded-md text-black font-medium'>{producto.quantity}</span></p>
                              <Button type='menu'
                                onClick={() => increaseQuantity(producto.id)}
                              >
                                <IoAdd size={30} />
                              </Button>
                            </div>
                          </div>
                          <div>
                            <p>S/. {producto.price} / por unidad</p>
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
            </div>
          </section>
          <section className='w-[500px] card max-h-60 flex flex-col gap-6 text-black'>
            <p className='text-center text-black font-medium '>Resumen del pedido ({totalItemsCart})</p>
            <div className='w-full'>
              {cartProducts.length > 0 ? (
                <p className='flex justify-between font-extrabold'>
                  <span>TOTAL</span>
                  <span>S./{calcularTotal()}</span>
                </p>
              ) : (
                <div className='flex items-center justify-between'>
                  <p>Carrito Vacio</p>
                  <Link to='/'>
                    <Button
                      type='primary'>
                      AGREGAR PRODUCTOS
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            {client ? (
              <Button
                type='primary'>
                <p className='flex mx-auto justify-center items-center text-center gap-2 text-lg font-bold'>
                  Pagar
                  <IoCardSharp />
                </p>
              </Button>
            ) : (
              <>
                <p>Debes iniciar sesion para realizar el pago</p>
                <Link to='/login/cli'>
                  <Button
                    type='primary'
                  >
                    INICIAR SESION
                  </Button>
                </Link>
              </>
            )}
          </section>
        </div>
      </section>
    </div>
  )
}

export default Carrito