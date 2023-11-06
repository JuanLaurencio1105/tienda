import React, { useEffect, useState } from 'react'
import Layout from '../../../layout/Layout'
import Button from '../../../components/Button'
import Thead from '../../../components/Thead'
import axios from '../../../api/axios'
import ListPedidos from './components/ListPedidos'
import useModal from '../../../hooks/useModal'
import Modal from '../../../components/Modal'
import AddPedido from './components/AddPedido'

const Pedidos = () => {

  const headtTable = ['#', 'NUMERO DE ORDEN', 'FECHA DEL PEDIDO', 'TOTAL ORDEN', 'CLIENTE', 'ACCIONES']

  const { isOpen, closeModal, openModal } = useModal()

  const [pedidos, setPedidos] = useState([])

  const getPedidos = async () => {
    try {
      const response = await axios.get('pedido')
      setPedidos(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPedidos()
  }, [])
  return (
    <Layout>
      {
        isOpen && (
          <Modal title='REGISTRO DE NUEVO PEDIDO' closeModal={closeModal}>
            <AddPedido getPedidos={getPedidos} closeModal={closeModal} />
          </Modal>
        )
      }
      <div className='card'>
        <div>
          <Button
            type='primary'
            onClick={openModal}
          >
            REGISTRAR PEDIDOS
          </Button>
        </div>
        <table className='table'>
          <Thead
            key={headtTable}
            headers={headtTable}
          />
          <tbody>
            {
              pedidos.map((pedido, index) => (
                <ListPedidos
                  key={index}
                  index={index}
                  getPedidos={getPedidos}
                  pedidos={pedido}
                />
              ))
            }
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default Pedidos