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
import { SiMicrosoftexcel } from 'react-icons/si'
import { BsFiletypePdf } from 'react-icons/bs'
import toast, { Toaster } from 'react-hot-toast'
import Loader from '../../../components/Loader'

const Products = () => {

  const [products, setProducts] = useState([])
  const [handleModal, setHandleModal] = useState(null)
  const [isOpenExport, setIsOpenExport] = useState(false)
  const { isOpen, openModal, closeModal } = useModal()
  const [searchProduct, setSearchProduct] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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

  const searcher = (e) => {
    setSearchProduct(e.target.value)
  }

  let results = []
  const resultsFiltered = products.filter((product) => product.nameProduct.toLowerCase().includes(searchProduct.toLowerCase()))

  if (searchProduct !== resultsFiltered) {
    results = resultsFiltered.filter((dato) => dato.nameProduct.toLowerCase().includes(searchProduct.toLowerCase()))
  }

  const toggleButtonExport = () => {
    setIsOpenExport(!isOpenExport)
  }

  const handleModalCategory = () => {
    setHandleModal('modalNewCategory')
  }

  const handleCloseModal = () => {
    setHandleModal(null)
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await axios.post('categoria', data)
      toast.success('Categoria Agregada Correctamente')
      console.log(response.data)
    } catch (error) {
      toast.error('Error al Agregar Categoria')
      console.error(error)
    } finally {
      handleCloseModal()
      setIsLoading(false)
    }
  }

  const newShowToast = (options) => {
    const { type, message } = options

    switch (type) {
      case 'success':
        toast.success(message)
        break;
      case 'error':
        toast.error(message)
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    getProducts()

    const closeButtonsExport = () => setIsOpenExport(false)
    window.addEventListener('mousedown', closeButtonsExport)
    return () => window.removeEventListener('mousedown', closeButtonsExport)
  }, [])

  const headTable = ['#', 'NOMBRE PRODUCTO', 'PRECIO', 'STOCK', 'CATEGORIA', 'ACCIONES']
  return (
    <Layout>
      {
        isOpen && (
          <Modal title='REGISTRAR NUEVO PRODUCTO' closeModal={closeModal} >
            <AddProduct getProducts={getProducts} closeModal={closeModal} toast={newShowToast} />
          </Modal>
        )
      }
      {
        handleModal === 'modalNewCategory' && (
          <Modal title='CATEGORIA NUEVA' closeModal={handleCloseModal}>
            <form onSubmit={handleSubmit(onSubmit)} method='post'>
              <FormInput
                type='text'
                label='Nombre Categoria'
                name='nameCategory'
                register={register}
                rules={{ required: true }}
                errors={errors}
              />
              <div className='flex justify-end gap-4 py-2'>
                <Button type='primary'>
                  {isLoading ? <Loader /> : 'Registrar'}
                </Button>
                <Button onClick={handleCloseModal} type='secondary'>
                  Cancelar
                </Button>
              </div>
            </form>
          </Modal>
        )
      }
      <Toaster position='top-right' toastOptions={{ duration: 5000 }} />
      <div className='card'>
        <div className='flex justify-between gap-4'>
          <div className='flex gap-4'>
            <Button
              type='primary'
              onClick={openModal}
            >
              Nuevo Producto
            </Button>
            <Button
              type='primary'
              onClick={handleModalCategory}
            >
              Nueva Categoria
            </Button>
            <div>
              <div className='form-group'>
                <input
                  className='input'
                  type='text'
                  placeholder=' '
                  value={searchProduct}
                  onChange={searcher}
                />
                <label className='label'>Buscar Producto</label>
              </div>
            </div>
          </div>
          <div className='relative'>
            <Button
              type='primary'
              onClick={toggleButtonExport}
            >
              Exportar
            </Button>
            {isOpenExport && (
              <div
                onMouseDown={(e) => e.stopPropagation()}
                className='absolute top-10 right-0 z-50 bg-darkSecondary text-white px-4 py-2 rounded-md border border-slate-400'
              >
                <button className='flex justify-start items-center gap-2 px-4 py-2 rounded-md hover:bg-slate-600'>
                  <SiMicrosoftexcel size={20} />
                  <span>Excel</span>
                </button>
                <hr />
                <button className='flex justify-start items-center gap-2 px-4 py-2 rounded-md hover:bg-slate-600'>
                  <BsFiletypePdf size={20} />
                  <span>PDF</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <table className='table'>
          <Thead key={headTable} headers={headTable} />
          <tbody>
            {resultsFiltered.map((product, index) => (
              <ListProducts
                key={index}
                productos={product}
                getProducts={getProducts}
                index={index}
                toast={newShowToast}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default Products