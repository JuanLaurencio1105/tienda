import { useForm } from 'react-hook-form'
import axios from '../../../api/axios'
import Modal from '../../../components/Modal'
import FormInput from '../../../form/FormInput'
import Button from '../../../components/Button'
import { useState } from 'react'
import Loader from '../../../components/Loader'

const CreateUsersForm = ({ closeModal, getUser, toast }) => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    setIsLoading(true)

    try {
      const response = await axios.post('auth', data)
      toast({ type: 'success', message: 'Usuario Registrado con Exito' })
      console.log(response.data)
      getUser()
      setIsLoading(false)
    } catch (error) {
      toast({ type: 'error', message: 'Error al Registrar el Usuario' })
      console.log(error)
    } finally {
      setIsLoading(false)
      closeModal()
    }
  }

  return (
    <Modal title='REGISTRAR USUARIO NUEVO' closeModal={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)} method='post' className='flex flex-col gap-4'>
        <FormInput
          type='text'
          label='Nombre de Usuario'
          name='userName'
          register={register}
          rules={{ required: true }}
          errors={errors}
        />
        <FormInput
          type='text'
          label='Correo Electronico'
          name='email'
          register={register}
          rules={{ required: true }}
          errors={errors}
        />
        <FormInput
          type='text'
          label='Contraseña'
          name='password'
          register={register}
          rules={{ required: true }}
          errors={errors}
        />
        <div className='flex justify-end items-center pb-4 gap-4'>
          <Button
            type='primary'
          >
            {isLoading ? <Loader /> : 'Registrar'}
          </Button>
          <Button
            onClick={closeModal}
            type='secondary'
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default CreateUsersForm