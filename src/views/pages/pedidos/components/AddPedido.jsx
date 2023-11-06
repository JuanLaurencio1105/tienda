import React from 'react'
import FormInput from '../../../../form/FormInput'
import { useForm } from 'react-hook-form'
import axios from '../../../../api/axios'
import Button from '../../../../components/Button'

const AddPedido = ({ closeModal, getPedidos }) => {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('pedido', data)
      console.log(response.data)
      closeModal()
      getPedidos()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} method='post' className='flex flex-col gap-4'>
      <FormInput
        type='text'
        label='TOTAL ORDEN'
        name='totalOrder'
        register={register}
        rules={{ require: true }}
        errors={errors}
      />
      <FormInput
        type='text'
        label='CLIENTE '
        name='cliente.id'
        register={register}
        rules={{ require: true }}
        errors={errors}
      />
      <div>
        <Button
          type='primary'
        >
          REGISTRAR
        </Button>
      </div>
    </form>
  )
}

export default AddPedido