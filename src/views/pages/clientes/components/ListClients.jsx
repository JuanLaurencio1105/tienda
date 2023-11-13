import Button from '../../../../components/Button'
import { FaEye } from 'react-icons/fa'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { useState } from 'react'
import EditClientsForm from './EditClientsForm'
import useModal from '../../../../hooks/useModal'
import ViewDataClients from './ViewDataClients'
import CustomAlert from '../../../../components/CustomAlert'
import axios from '../../../../api/axios'
import toast, { Toaster } from 'react-hot-toast'
const ListClients = ({ cliente, index, getCliente, toast }) => {

  const [handleModal, setHandleModal] = useState(null)

  const handleModalCreate = () => {
    setHandleModal('modalCreate')
  }

  const handleModalView = () => {
    setHandleModal('modalView')
  }

  const handleModalDelete = () => {
    setHandleModal('modalDelete')
  }

  const handleCloseModal = () => {
    setHandleModal(null)
  }

  const deleteClient = async () => {
    try {
      await axios.delete(`clientes/${cliente.id}`)
      toast({ type: 'success', message: 'Cliente Eliminado con Exito' })
      getCliente()
    } catch (error) {
      console.error(error)
      toast({ type: 'error', message: 'Error al Eliminar el Cliente' })
    }
  }

  return (
    <>
      {/* <Toaster position='top-right' toastOptions={{ duration: 5000 }} /> */}
      <tr>
        <td className='td'>{index + 1}</td>
        <td className='td'>{cliente.names}</td>
        <td className='td'>{cliente.lastNames}</td>
        <td className='td'>{cliente.email}</td>
        <td className='td'>{cliente.phoneNumber}</td>
        <td className='td'>{cliente.address}</td>
        <td className='td'>
          <div className='flex gap-2 justify-center'>
            <Button
              type='menu'
              onClick={handleModalView}
            >
              <FaEye size={22} />
            </Button>
            <Button
              type='menu'
              onClick={handleModalCreate}
            >
              <BiEdit size={22} />
            </Button>
            <Button
              type='menu'
              onClick={handleModalDelete}
            >
              <MdDelete size={22} />
            </Button>
          </div>
        </td>
        {
          handleModal === 'modalCreate' && (
            <EditClientsForm
              closeModal={handleCloseModal}
              cliente={cliente}
              getCliente={getCliente}
              toast={toast}
            />
          )
        }
        {
          handleModal === 'modalView' && (
            <ViewDataClients closeModal={handleCloseModal} />
          )
        }
        {
          handleModal === 'modalDelete' && (
            <CustomAlert
              title='ADVERTENCIA'
              closeAlert={handleCloseModal}
              type='default'
              message='¿Esta seguro de eliminar el registro?'
              setData={deleteClient}
            />
          )
        }
      </tr>
    </>
  )
}

export default ListClients