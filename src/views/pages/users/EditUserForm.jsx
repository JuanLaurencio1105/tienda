import { useForm } from 'react-hook-form'
import Modal from '../../../components/Modal'
import FormInput from '../../../form/FormInput'
import Button from '../../../components/Button'
import { useEffect } from 'react'
import axios from '../../../api/axios'

const EditUserForm = ({ closeModal, user, getUser }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(`auth/${user.id}`, data)
      console.log(response)
      getUser()
      closeModal()
    } catch (error) {
      console.log(error)
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
            label='NOMBRE DE USUARIO'
            name='userName'
            register={register}
            rules={{ required: true }}
            errors={errors}
          />
          <FormInput
            type='text'
            label='CORREO ELECTRONICO'
            name='email'
            register={register}
            rules={{ required: true }}
            errors={errors}
          />
          <FormInput
            type='text'
            label='CONTRASEÑA'
            name='password'
            register={register}
            rules={{ required: true }}
            errors={errors}
          />
          <div className='flex justify-center pb-4'>
            <Button
              type='primary'
            >
              REGISTRAR
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default EditUserForm