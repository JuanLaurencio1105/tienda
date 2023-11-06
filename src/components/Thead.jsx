import React from 'react'

const Thead = ({ headers }) => {
  return (
    <thead className='text-sm'>
      <tr>
        {
          headers.map((header) => (
            <th className='py-1 px-4 border-b border-gray' key={header}>
              {header}
            </th>
          ))
        }
      </tr>
    </thead>
  )
}

export default Thead