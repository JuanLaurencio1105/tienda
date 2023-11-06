import { useForm } from 'react-hook-form'
import axios from '../../../api/axios'
import Modal from '../../../components/Modal'
import FormInput from '../../../form/FormInput'
import Button from '../../../components/Button'

const CreateUsersForm = ({ closeModal, getUser }) => {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('auth', data)
      console.log(response.data)
      getUser()
      closeModal()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal title='REGISTRAR USUARIO NUEVO' closeModal={closeModal}>
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
        <div className='flex justify-end items-center pb-4'>
          <Button
            type='primary'
          >
            REGISTRAR
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default CreateUsersForm