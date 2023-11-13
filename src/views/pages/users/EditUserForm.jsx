import { useForm } from 'react-hook-form'
import Modal from '../../../components/Modal'
import FormInput from '../../../form/FormInput'
import Button from '../../../components/Button'
import { useEffect, useState } from 'react'
import axios from '../../../api/axios'
import Loader from '../../../components/Loader'

const EditUserForm = ({ closeModal, user, getUser, toast }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await axios.put(`auth/${user.id}`, data)
      toast({ type: 'success', message: 'Usuario Actualizado Correctamente' })
      console.log(response)
      setIsLoading(false)
      getUser()
    } catch (error) {
      toast({ type: 'success', message: 'Error al Actualizar el Usuario ' })
      console.log(error)
    } finally {
      setIsLoading(false)
      closeModal()
    }
  }
  useEffect(() => {
    reset({
      id: user.id,
      userName: user.userName,
      email: user.email,
      password: user.password
    })
  }, [])
  return (
    <Modal title='ACTUALIZAR DATOS DEL USUARIO' closeModal={closeModal}>
      <div>
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
          <div className='flex justify-end pb-4 gap-4'>
            <Button
              type='primary'
            >
              {isLoading ? <Loader /> : 'Actualizar'}
            </Button>
            <Button
              onClick={closeModal}
              type='secondary'
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default EditUserForm