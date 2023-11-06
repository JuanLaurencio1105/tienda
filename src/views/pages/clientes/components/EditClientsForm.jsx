import { useForm } from 'react-hook-form'
import axios from '../../../../api/axios'
import Modal from '../../../../components/Modal'
import FormInput from '../../../../form/FormInput'
import { useEffect } from 'react'
import Button from '../../../../components/Button'
const EditClientsForm = ({ closeModal, cliente, getCliente }) => {

  const { handleSubmit, reset, register, formState: { errors } } = useForm()

  const onUpdate = async (data) => {
    const response = await axios.put(`clientes/${cliente.id}`, data)
    console.log(response.data)
    closeModal()
    getCliente()
  }

  useEffect(() => {
    reset({
      id: cliente.id,
      numberIdentification: cliente.numberIdentification,
      names: cliente.names,
      lastNames: cliente.lastNames,
      email: cliente.email,
      phoneNumber: cliente.phoneNumber,
      address: cliente.address
    })
  }, [])

  return (
    <Modal title='EDITAR INFORMACION DEL CLIENTE' closeModal={closeModal}>
      <form onSubmit={handleSubmit(onUpdate)} method='post' className='flex flex-col gap-4'>
        <div className='flex gap-4'>
          <FormInput
            type='text'
            label={'N° DE IDENTIFICACION'}
            name='numberIdentification'
            register={register}
            errors={errors}
          />
          <FormInput
            type='text'
            label={'NOMBRES'}
            name='names'
            register={register}
            errors={errors}
          />
          <FormInput
            type='text'
            label={'APELLIDOS'}
            name='lastNames'
            register={register}
            errors={errors}
          />
        </div>
        <div className='flex gap-4'>
          <FormInput
            type='text'
            label={'EMAIL'}
            name='email'
            register={register}
            errors={errors}
          />
          <FormInput
            type='text'
            label={'NUMERO DE TELEFONO'}
            name='phoneNumber'
            register={register}
            errors={errors}
          />
          <FormInput
            type='text'
            label={'DIRECCION'}
            name='address'
            register={register}
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
    </Modal>
  )
}

export default EditClientsForm