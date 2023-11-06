import React, { useEffect, useState } from 'react'
import Button from '../../../components/Button'
import Thead from '../../../components/Thead'
import ListClients from './components/ListClients'
import axios from '../../../api/axios'
import useModal from '../../../hooks/useModal'
import Modal from '../../../components/Modal'
import CreateClientsForm from './components/CreateClientsForm'
import Layout from '../../../layout/Layout'

const Clients = () => {

  const { isOpen, closeModal, openModal } = useModal()
  const thead = ['#', 'NOMBRES', 'APELLIDOS', 'CORREO', 'TELEFONO', 'DIRECCION', 'ACCIONES']

  const [clientes, setClientes] = useState([])
  const [searchClient, setSearchClient] = useState('')

  const searcher = (e) => {
    setSearchClient(e.target.value)
  }


  let results = []

  const resultsFiltered = clientes.filter((cliente) => cliente.names.toLowerCase().includes(searchClient.toLowerCase()))


  if (searchClient !== resultsFiltered) {
    results = resultsFiltered.filter((dato) => dato.names.toLowerCase().includes(searchClient.toLowerCase()))
  }

  const getClients = async () => {
    const response = await axios.get('clientes')
    setClientes(response.data)
    // setSearchClient(response.data)
  }

  // console.log(searcher)

  useEffect(() => {
    getClients()
  }, [])

  return (
    <Layout>
      {
        isOpen && (
          <Modal title='REGISTRO DE NUEVO CLIENTE' closeModal={closeModal}>
            <CreateClientsForm closeModal={closeModal} getClients={getClients} />
          </Modal>
        )
      }
      <div className='card'>
        <div className='flex justify-between gap-4'>
          <div className='flex justify-center items-center gap-4'>
            <Button
              type='primary'
              onClick={openModal}
            >
              REGISTRAR NUEVO CLIENTE
            </Button>
            <div className='form-group'>
              <input
                className='input'
                type='text'
                placeholder=' '
                value={searchClient}
                onChange={searcher}
              />
              <label className='label'>Buscar Clientes</label>
            </div>
          </div>
        </div>
        <table className='table'>
          <Thead headers={thead} />
          <tbody>
            {
              resultsFiltered.map((cliente, index) => (
                <ListClients
                  index={index}
                  key={cliente.id}
                  cliente={cliente}
                  getCliente={getClients}
                />
              ))
            }
          </tbody>
          <tbody>
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default Clients