import { useState } from 'react'
import Button from '../../../../components/Button'
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFundView
} from 'react-icons/ai'
import EditProduct from './EditProduct'
import axios from '../../../../api/axios'
import CustomAlert from '../../../../components/CustomAlert'

const ListProducts = ({ productos, index, getProducts, toast }) => {

  const [handleModal, setHandleModal] = useState(null)

  const handleModalEdit = () => {
    setHandleModal('modalEdit')
  }

  const handleCloseModal = () => {
    setHandleModal(null)
  }

  const handleModalDelete = () => {
    setHandleModal('modalDelete')
  }

  const deleteProduct = async () => {
    try {
      const response = await axios.delete(`productos/${productos.id}`)
      toast({ type: 'success', message: 'Producto Eliminado con Exito' })
      handleCloseModal()
      getProducts()
      console.log(response.data)
    } catch (error) {
      toast({ type: 'success', message: 'Error al Eliminar el Producto' })
      console.log(error)
    }
  }

  return (
    <tr>
      <td className='td'>{index + 1}</td>
      <td className='td'>{productos?.nameProduct}</td>
      <td className='td'>S./ {productos?.price.toFixed(2)}</td>
      <td className='td'>{productos?.stock}/Uds.</td>
      <td className='td'>{productos?.categoria?.nameCategory || 'NO AGREGADO'}</td>
      <td className='td'>
        <div className='flex justify-center gap-2'>
          <Button
            type='menu'
            onClick={handleModalEdit}
          >
            <AiOutlineEdit />
          </Button>
          <Button
            type='menu'
          >
            <AiOutlineFundView />
          </Button>
          <Button
            type='menu'
            onClick={handleModalDelete}
          >
            <AiOutlineDelete />
          </Button>
        </div>
        {
          handleModal === 'modalEdit' && (
            <EditProduct
              getProductos={getProducts}
              closeModal={handleCloseModal}
              productos={productos}
              toast={toast}
            />
          )
        }
        {
          handleModal === 'modalDelete' && (
            <CustomAlert
              closeAlert={handleCloseModal}
              title='ADVERTENCIA'
              type='default'
              message='¿Esta seguro de Eliminar el Registro?'
              setData={deleteProduct}
            />
          )
        }
      </td>
    </tr>
  )
}

export default ListProducts