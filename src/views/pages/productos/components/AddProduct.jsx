import { useForm } from 'react-hook-form'
import FormInput from '../../../../form/FormInput'
import axios from '../../../../api/axios'
import Button from '../../../../components/Button'
import { useEffect, useState } from 'react'
import Loader from '../../../../components/Loader'
const AddProduct = ({ closeModal, getProducts, toast }) => {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const [category, setCategory] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await axios.post('productos', data)
      toast({ type: 'success', message: 'Producto Registrado con Exito' })
      getProducts()
      console.log(response.data)
    } catch (error) {
      toast({ type: 'error', message: 'Error al Agregar el Producto' })
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
    getCategoryProducts()
  }, [])
  return (
    <form onSubmit={handleSubmit(onSubmit)} method='post' className='flex flex-col gap-4 px-2'>
      <FormInput
        type='text'
        label='Nombre del Producto'
        name='nameProduct'
        register={register}
        rules={{ required: true }}
        errors={errors}
      />
      <FormInput
        type='text'
        label='Descripcion'
        name='description'
        register={register}
        rules={{ required: true }}
        errors={errors}
      />
      <FormInput
        type='text'
        label='Precio'
        name='price'
        register={register}
        rules={{ required: true }}
        errors={errors}
      />
      <FormInput
        type='text'
        label='Cantidad (Stock)'
        name='stock'
        register={register}
        rules={{ required: true }}
        errors={errors}
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
      <div className='pb-2 flex justify-end gap-4'>
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
  )
}

export default AddProduct