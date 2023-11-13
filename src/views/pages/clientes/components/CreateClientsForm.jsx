import { useForm } from 'react-hook-form'
import axios from '../../../../api/axios'
import FormInput from '../../../../form/FormInput'
import Button from '../../../../components/Button'
import { useState } from 'react'
import Loader from '../../../../components/Loader'
import toast, { Toaster } from 'react-hot-toast'
const CreateClientsForm = ({ getClients, closeModal, toast }) => {

  const { handleSubmit, register, formState: { errors } } = useForm()

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await axios.post('clientes', data)
      console.log(response.data)
      toast({ type: 'success', message: 'Cliente Registrado con exito' })
      getClients()
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      toast({ type: 'error', message: 'Error el Registar el Cliente' })
    } finally {
      setIsLoading(false)
      closeModal()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} method='post' className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        <FormInput
          type='text'
          label={'N° DE DOCUMENTO'}
          name='numberIdentification'
          register={register}
          rules={{ required: true }}
          errors={errors}
        />
        <FormInput
          type='text'
          label={'NOMBRES'}
          name='names'
          register={register}
          rules={{ required: true }}
          errors={errors}
        />
        <FormInput
          type='text'
          label={'APELLIDOS'}
          name='lastNames'
          register={register}
          rules={{ required: true }}
          errors={errors}
        />
      </div>
      <div className='flex gap-4'>
        <FormInput
          type='text'
          label={'EMAIL'}
          name='email'
          register={register}
          rules={{ required: true }}
          errors={errors}
        />
        <FormInput
          type='text'
          label={'NUMERO DE TELEFONO'}
          name='phoneNumber'
          register={register}
          rules={{ required: true }}
          errors={errors}
        />
      </div>
      <div className='flex gap-4'>
        <FormInput
          type='text'
          label={'DIRECCION'}
          name='address'
          register={register}
          rules={{ required: true }}
          errors={errors}
        />
        <FormInput
          type='text'
          label={'CONTRASEÑA'}
          name='password'
          register={register}
          rules={{ required: true }}
          errors={errors}
        />
      </div>
      <div className='flex justify-end gap-4 pb-2'>
        <Button
          type='primary'
        >
          {isLoading ? <Loader /> : 'Registrar'}
        </Button>
        <Button
          type='secondary'
          onClick={closeModal}
        >
          Cancelar
        </Button>
      </div>

    </form>
  )
}

export default CreateClientsForm