import { AiOutlineAlert } from 'react-icons/ai'
import Button from '../../../components/Button'
import { FaEye } from 'react-icons/fa'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import useModal from '../../../hooks/useModal'
import { useState } from 'react'
import EditUserForm from './EditUserForm'
import CustomAlert from '../../../components/CustomAlert'
import axios from '../../../api/axios'

const ListUser = ({ user, getUser, index }) => {

  const { openModal, closeModal, isOpen } = useModal()

  const [handleModal, setHandleModal] = useState(null)

  const handleModalEdit = () => {
    setHandleModal('modalEditUser')
  }

  const handleModalDelete = () => {
    setHandleModal('modalDeleteUser')
  }

  const handleCloseModal = () => {
    setHandleModal(null)
  }

  const deleteUser = async () => {
    await axios.delete(`auth/${user.id}`)
    getUser()
  }

  return (
    <tr>
      <td className='td'>{index + 1}</td>
      <td className='td'>{user.userName}</td>
      <td className='td'>{user.email}</td>
      <td className='td'>{user.password}</td>
      <td className='td'>
        <div className='flex gap-2 justify-center items-center'>
          <Button
            type='menu'
          >
            <FaEye size={22} />
          </Button>
          <Button
            type='menu'
            onClick={handleModalEdit}
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
        handleModal === 'modalEditUser' && (
          <EditUserForm
            user={user}
            getUser={getUser}
            closeModal={handleCloseModal} />
        )
      }
      {
        handleModal === 'modalDeleteUser' && (
          <CustomAlert
            closeAlert={handleCloseModal}
            title='ADVERTENCIA'
            type='default'
            message='¿Esta seguro de eliminar el registro?'
            setData={deleteUser}
          />
        )
      }
    </tr>
  )
}

export default ListUser