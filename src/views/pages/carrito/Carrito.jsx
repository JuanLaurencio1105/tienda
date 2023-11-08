import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../../../navmenu/NavBar'
import Button from '../../../components/Button'
import { Link } from 'react-router-dom'
import { useProductContext } from '../../../context/ProductContext'
import { IoAdd, IoArrowBack, IoCardSharp, IoRemove } from 'react-icons/io5'
import { ClientContext } from '../../../context/ClientContext'
import { NewCartContext } from '@/context/NewCartContext'
import { AuthContext } from '../../../context/AuthContextProvider'

const Carrito = () => {
  const [cartProducts, setCartProducts] = useState([])
  const { allProducts } = useProductContext()
  const cartContext = useContext(NewCartContext)
  const authContext = useContext(AuthContext)


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

  /* const increaseQuantity = (productId) => {
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
  } */

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
            <p className='card text-black font-medium'>Resumen del pedido ({cartContext.cartLength})</p>
            <div className='card text-black'>
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
                                <Button
                                  type='menu'
                                  onClick={() => cartContext.decrementQuantity({ productId: producto.id })}
                                >
                                  <IoRemove size={30} />
                                </Button>
                                <p>Cantidad: <span className='bg-lime-300 border border-black px-2 py-1 rounded-md text-black font-medium'>{producto.quantity}</span></p>
                                <Button type='menu'
                                  onClick={() => cartContext.incrementQuantity({ productId: producto.id })}
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
            </div>
          </section>
          <section className='w-[500px] card max-h-60 flex flex-col gap-6 text-black'>
            <p className='text-center text-black font-medium '>Resumen del pedido ({cartContext.cartLength})</p>
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
            {authContext.user ? (
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
