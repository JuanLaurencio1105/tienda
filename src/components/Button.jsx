
const Button = ({ children, type, onClick, total }) => {

  return (
    <>
      {
        type === 'menu' && (
          <button
            onClick={onClick}
            className='btn-menu'
          >
            {children}
          </button>
        )
      }
      {
        type === 'menu-hidden' && (
          <button
            onClick={onClick}
            className='btn-menu-hidden'
          >
            {children}
          </button>
        )
      }
      {
        type === 'primary' && (
          <button
            onClick={onClick}
            className='rounded-lg bg-blue-400 px-4 py-2 hover:bg-blue-500 transition-all flex items-center gap-2'
          >
            {children}
          </button>
        )
      }
      {
        type === 'danger' && (
          <button
            onClick={onClick}
            className='rounded-lg bg-red-400 px-4 py-2 hover:bg-red-500 transition-all flex'
          >
            {children}
          </button>
        )
      }
      {
        type === 'cart' && (
          <button
            onClick={onClick}
            className='fixed top-20 right-5 bg-sky-400 text-white p-4 rounded-full '
          >
            <p className='absolute top-0 right-0 bg-red-500 rounded-full px-2'>{total}</p>
            {children}
          </button>
        )
      }
    </>
  )
}

export default Button