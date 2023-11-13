import { useForm } from 'react-hook-form'
import Modal from '../../../../components/Modal'
import FormInput from '../../../../form/FormInput'
import { useEffect, useState } from 'react'
import axios from '../../../../api/axios'
import Button from '../../../../components/Button'
import Loader from '../../../../components/Loader'

const EditProduct = ({ closeModal, getProductos, productos, toast }) => {

  const [category, setCategory] = useState([])
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const onUpdate = async (data) => {
    setIsLoading(true)
    try {
      await axios.put(`productos/${productos.id}`, data)
      toast({ type: 'success', message: 'Producto Actualizado con Exito' })
      getProductos()
      console.log(data)
    } catch (error) {
      toast({ type: 'error', message: 'Error al Actualizar el Producto ' })
      console.log(error)
    } finally {
      setIsLoading(false)
      closeModal()
    }
  }

  const getCategoryProducts = async () => {
    const response = await axios.get('categoria')
    // console.log(response.data)
    setCategory(response.data)
  }

  useEffect(() => {
    reset({
      id: productos?.id,
      categoria: productos?.categoria?.categoriaID,
      nameProduct: productos?.nameProduct,
      description: productos?.description,
      price: productos?.price,
      stock: productos?.stock,
    })
    getCategoryProducts()
  }, [])

  return (
    <Modal title='EDITAR DATOS DEL PRODUCTO' closeModal={closeModal}>
      <form onSubmit={handleSubmit(onUpdate)} method='post' className='flex flex-col gap-4'>
        <FormInput
          type='text'
          errors={errors}
          label='Nombre del Producto'
          name='nameProduct'
          register={register}
          rules={{ required: true }}
        />
        <FormInput
          type='text'
          errors={errors}
          label='Descripcion'
          name='description'
          register={register}
          rules={{ required: true }}
        />
        <FormInput
          type='text'
          errors={errors}
          label='Precio'
          name='price'
          register={register}
          rules={{ required: true }}
        />
        <FormInput
          type='text'
          errors={errors}
          label='Cantidad'
          name='stock'
          register={register}
          rules={{ required: true }}
        />
        <div className='form-group'>
          <select className='input bg-darkPrimary'
            {...register('categoria.categoriaID')}
          >
            {
              category.map((categoria) => (
                <option
                  key={categoria.categoriaID}
                  value={categoria.categoriaID}
                >
                  {categoria.nameCategory}
                </option>
              ))
            }
          </select>
        </div>
        <div className='flex justify-end gap-4 pb-2'>
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
    </Modal>
  )
}

export default EditProduct