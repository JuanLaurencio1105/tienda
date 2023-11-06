import { createPortal } from 'react-dom'
import Button from './Button'
import { FiAlertTriangle } from 'react-icons/fi'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const CustomAlert = ({ type = 'default', title, closeAlert, setData, message }) => {
  return createPortal(
    <div className='h-screen w-screen flex justify-center items-center fixed top-0 left-0 bg-black bg-opacity-50 p-12 z-50 overflow-hidden'>
      <div className='bg-dark rounded-2xl p-2 text-white'>
        {
          type === 'default' && (
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between items-center py-2'>
                <p className='text-orange-500 font-medium text-2xl'>{title || 'Titulo del Modal'}</p>
                <button onClick={closeAlert}>
                  <AiOutlineCloseCircle className='cursor-pointer text-3xl text-white' />
                </button>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <FiAlertTriangle className='text-orange-500'
                  size={150}
                />
                <p className='text-white text-xl max-w-xs text-center'>{message}</p>
              </div>
              <div className='flex justify-end gap-4'>
                <Button type='primary' onClick={closeAlert}>CANCELAR</Button>
                <Button type='primary' onClick={setData}>OK</Button>
              </div>
            </div>
          )
        }
      </div>
    </div>,
    document.getElementById('portal')
  )
}

export default CustomAlert