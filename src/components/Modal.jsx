import { createPortal } from 'react-dom'
import { GrClose } from 'react-icons/gr'
const Modal = ({ children, title, closeModal }) => {
  return createPortal(
    <div className='h-screen w-screen flex justify-center items-center fixed top-0 left-0 bg-black bg-opacity-50 p-12 z-50 overflow-hidden'>
      <section className='rounded-md bg-blank z-[120] absolute top-8'>
        <div className='flex justify-between items-center pr-2 pl-4 py-2 border-b'>
          <p className='uppercase text-lg text-dark font-semibold'>
            {title || 'Nombre Modal'}
          </p>
          <button className='p-2 hover:bg-slate-400 rounded-md hover:transition cursor-pointer' onClick={closeModal}>
            <GrClose />
          </button>
        </div>
        <div className='px-4 pt-4'>
          {children}
        </div>
      </section>
    </div>,
    document.getElementById('portal')
  )
}

export default Modal