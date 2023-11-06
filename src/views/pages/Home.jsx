import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import Button from '../../components/Button'
import Thead from '../../components/Thead'
import axios from '../../api/axios'
import ListUser from './users/ListUser'
import useModal from '../../hooks/useModal'
import CreateUsersForm from './users/CreateUsersForm'

const Home = () => {

  const headUsers = ['#', 'NOMBRE', 'CORREO ELECTRONICO', 'CONTRASEÑA', 'ACCIONES']

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

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <Layout>
      <div className='card'>
        {
          isOpen && (
            <CreateUsersForm getUser={getUsers} closeModal={closeModal} />
          )
        }
        <div>
          <Button
            type='primary'
            onClick={openModal}
          >
            REGISTRAR NUEVO USUARIO
          </Button>
        </div>
        <table className='table'>
          <Thead
            headers={headUsers}
          />
          <tbody>
            {users.map((user, index) => (
              <ListUser
                key={index}
                user={user}
                getUser={getUsers}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default Home