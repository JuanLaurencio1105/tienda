import Button from '../../../components/Button'
import Thead from '../../../components/Thead'
import Layout from '../../../layout/Layout'
import ListProducts from './components/ListProducts'
import axios from '../../../api/axios'
import { useEffect, useState } from 'react'
import AddProduct from './components/AddProduct'
import useModal from '../../../hooks/useModal'
import Modal from '../../../components/Modal'
import FormInput from '../../../form/FormInput'
import { get, useForm } from 'react-hook-form'

const Products = () => {

  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [handleModal, setHandleModal] = useState(null)

  const { isOpen, openModal, closeModal } = useModal()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const getProducts = async () => {
    try {
      const response = await axios.get('productos')
      console.log(response.data)
      setProducts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleModalCategory = () => {
    setHandleModal('modalNewCategory')
  }

  const handleCloseModal = () => {
    setHandleModal(null)
  }

  const onSubmit = async (data) => {
    const response = await axios.post('categoria', data)
    // console.log(response.data)
  }

  useEffect(() => {
    getProducts()
    // getCategoryProducts()
  }, [])

  const headTable = ['#', 'NOMBRE PRODUCTO', 'PRECIO', 'STOCK', 'CATEGORIA', 'ACCIONES']
  return (
    <Layout>
      {
        isOpen && (
          <Modal title='REGISTRAR NUEVO PRODUCTO' closeModal={closeModal} >
            <AddProduct getProducts={getProducts} closeModal={closeModal} />
          </Modal>
        )
      }
      {
        handleModal === 'modalNewCategory' && (
          <Modal title='CATEGORIA NUEVA' closeModal={handleCloseModal}>
            <form onSubmit={handleSubmit(onSubmit)} method='post'>
              <FormInput
                type='text'
                label='NOMBRE CATEGORIA'
                name='nameCategory'
                register={register}
                rules={{ required: true }}
                errors={errors}
              />
              <Button type='primary'>
                ENVIAR
              </Button>
            </form>
          </Modal>
        )
      }
      <div className='card'>
        <div className='flex gap-4'>
          <Button
            type='primary'
            onClick={openModal}
          >
            AGREGAR NUEVO PRODUCTO
          </Button>
          <Button
            type='primary'
            onClick={handleModalCategory}
          >
            AGREGAR CATEGORIA DE PRODUCTO
          </Button>
        </div>
        <table className='table'>
          <Thead key={headTable} headers={headTable} />
          <tbody>
            {products.map((product, index) => (
              <ListProducts
                key={index}
                productos={product}
                getProducts={getProducts}
                index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default Products