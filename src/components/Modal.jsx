import { createPortal } from 'react-dom'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { GrClose } from 'react-icons/gr'
const Modal = ({ children, title, closeModal }) => {
  return createPortal(
    <div className='h-screen w-screen flex justify-center items-center fixed top-0 left-0 bg-black bg-opacity-70 p-12 z-50 backdrop-blur-sm overflow-hidden'>
      <section className='rounded-md bg-[#252B3B] z-[120] absolute top-8'>
        <div className='flex justify-between items-center pr-2 pl-4 py-2 border-b gap-4'>
          <p className='uppercase text-lg text-white font-semibold'>
            {title || 'Nombre Modal'}
          </p>
          <button className='p-1 hover:bg-darkSecondary text-white rounded-md hover:transition cursor-pointer' onClick={closeModal}>
            <AiOutlineCloseCircle className='cursor-pointer text-3xl text-white' />
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