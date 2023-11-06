import React from 'react'

const FormInput = ({ type, register, name, label, rules, errors }) => {
  return (
    <div className='form-group'>
      <input
        className='input'
        type={type}
        placeholder=' '
        {...register(name, rules)}
      />
      <label
        className='label'
        htmlFor={name}>
        {label}
      </label>
      <p className='text-red-600'>
        {errors[name]?.type === 'required' && 'Este campo es obligatorio'}
        {errors[name]?.type === 'maxLength' && 'Solo se puede Ingresar cantidad de digitos'}
        {errors[name]?.type === 'patterns' && 'Ingresa un correo valido'}
      </p>
    </div>
  )
}

export default FormInput