import { AiOutlineDelete, AiOutlineEdit, AiOutlineFundView } from 'react-icons/ai'
import Button from '../../../../components/Button'
import { useEffect, useState } from 'react'
import DetailPedido from './DetailPedido'

const ListPedidos = ({ pedidos, getPedidos, index }) => {

  const dateFormatt = (date) => {
    return new Date(date).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
  }

  const [handleModal, setHandleModal] = useState(null)

  const handleDetailOrder = () => {
    setHandleModal('modalDetailOrder')
  }

  const handleCloseModal = () => {
    setHandleModal(null)
  }

  return (
    <tr>
      <td className='td'>{index + 1}</td>
      <td className='td'>{pedidos.orderID}</td>
      <td className='td'>{dateFormatt(pedidos.dateOrder)}</td>
      <td className='td'>{pedidos.totalOrder}</td>
      <td className='td'>{pedidos.cliente.names}</td>
      <td className='td'>
        <div className='flex justify-center gap-2'>
          <Button
            type='menu'
            onClick={handleDetailOrder}
          >
            <AiOutlineFundView />
          </Button>
          <Button
            type='menu'
          >
            <AiOutlineEdit />
          </Button>
          <Button
            type='menu'
          >
            <AiOutlineDelete />
          </Button>
        </div>
        {
          handleModal === 'modalDetailOrder' && (
            <DetailPedido closeModal={handleCloseModal} />
          )
        }
      </td>
    </tr>
  )
}

export default ListPedidos