import React from 'react'
import { createPortal } from 'react-dom'
import { AiOutlineClose } from 'react-icons/ai'
import Button from './Button'

const Cart = ({ title, closeModal, children }) => {
  return createPortal(
    <div className='h-screen w-[500px] bg-red-300 flex fixed top-0 right-0 z-50 border-l-4 border-solid border-gray-700'>
      <section className='w-full'>
        <div className='flex justify-between items-center gap-4 bg-slate-200 p-5'>
          <p>{title || 'NOMBRE DEL MODAL'}</p>
          <Button type='menu' onClick={closeModal}>
            <AiOutlineClose size={20} />
          </Button>
        </div>
        <div>
          {children}
        </div>
      </section>
    </div>, document.getElementById('portal')
  )
}

export default Cart