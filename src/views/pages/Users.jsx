import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import Button from '../../components/Button'
import Thead from '../../components/Thead'
import axios from '../../api/axios'
import ListUser from './users/ListUser'
import useModal from '../../hooks/useModal'
import CreateUsersForm from './users/CreateUsersForm'
import { BsFiletypePdf } from 'react-icons/bs'
import { SiMicrosoftexcel } from 'react-icons/si'
import toast, { Toaster } from 'react-hot-toast'

const Users = () => {

  const headUsers = ['#', 'NOMBRE', 'CORREO ELECTRONICO', 'CONTRASEÑA', 'ACCIONES']
  const [searchUser, setSearchUser] = useState('')
  const [isOpenExport, setIsOpenExport] = useState(false)

  const { isOpen, closeModal, openModal } = useModal()
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    try {
      const response = await axios.get('auth')
      console.log(response.data)
      setUsers(response.data)
    } catch (error) {
      console.log(error, 'ERROR AL OBTENER LOS CLIENTES')
    }
  }

  const toggleButtonExport = () => {
    setIsOpenExport(!isOpenExport)
  }

  const searcher = (e) => {
    setSearchUser(e.target.value)
  }

  let results = []
  const resultsFiltered = users.filter((user) => user.userName.toLowerCase().includes(searchUser.toLowerCase()))

  if (searchUser !== resultsFiltered) {
    results = resultsFiltered.filter((dato) => dato.userName.toLowerCase().includes(searchUser.toLowerCase()))
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
    getUsers()

    const closeButtonExport = () => setIsOpenExport(false)
    window.addEventListener('mousedown', closeButtonExport)
    return () => window.removeEventListener('mousedown', closeButtonExport)
  }, [])

  return (
    <Layout>
      <div className='card'>
        {
          isOpen && (
            <CreateUsersForm getUser={getUsers} closeModal={closeModal} toast={newShowToast} />
          )
        }
        <Toaster position='top-right' toastOptions={{ duration: 5000 }} />
        <div className='flex justify-between gap-4'>
          <div className='flex items-center justify-center gap-4'>
            <Button
              type='primary'
              onClick={openModal}
            >
              Nuevo Usuario
            </Button>
            <div>
              <div className='form-group'>
                <input
                  className='input'
                  type='text'
                  placeholder=' '
                  value={searchUser}
                  onChange={searcher}
                />
                <label className='label'>Buscar Usuarios</label>
              </div>
            </div>
          </div>
          <div className='relative'>
            <Button onClick={toggleButtonExport} type='primary' >
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
          <Thead
            headers={headUsers}
          />
          <tbody>
            {resultsFiltered.map((user, index) => (
              <ListUser
                key={index}
                user={user}
                getUser={getUsers}
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

export default Users