import { useEffect } from 'react'
import axios from '../../../../api/axios'
import Modal from '../../../../components/Modal'

const DetailPedido = ({ closeModal }) => {

  const getDetailOrder = async () => {
    try {
      const response = await axios.get('detalle-pedido')
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDetailOrder()
  }, [])
  return (
    <Modal title='DETALLES DEL PEDIDO' closeModal={closeModal}>
      sdfsdfsdf
    </Modal>
  )
}

export default DetailPedido