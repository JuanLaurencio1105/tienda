import { useForm } from 'react-hook-form'
import axios from '../../../../api/axios'
import FormInput from '../../../../form/FormInput'
import Button from '../../../../components/Button'
const CreateClientsForm = ({ getClients, closeModal }) => {

  const { handleSubmit, register, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    await axios.post('clientes', data)
    getClients()
    closeModal()
    console.log(data)
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
        <FormInput
          type='text'
          label={'DIRECCION'}
          name='address'
          register={register}
          rules={{ required: true }}
          errors={errors}
        />
      </div>
      <div className='flex justify-end gap-4 pb-2'>
        <Button
          type='primary'
        >
          REGISTRAR
        </Button>
        <Button
          type='primary'
          onClick={closeModal}
        >
          CANCELAR
        </Button>
      </div>
    </form>
  )
}

export default CreateClientsForm