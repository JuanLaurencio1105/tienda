import { useForm } from 'react-hook-form'
import FormInput from '../../../../form/FormInput'
import axios from '../../../../api/axios'
import Button from '../../../../components/Button'
import { useEffect, useState } from 'react'
const AddProduct = ({ closeModal, getProducts }) => {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const [category, setCategory] = useState([])

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('productos', data)
      closeModal()
      getProducts()
      // console.log(response.data)
    } catch (error) {
      console.log(error)
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
        label='NOMBRE DEL PRODUCTO'
        name='nameProduct'
        register={register}
        rules={{ required: true }}
        errors={errors}
      />
      <FormInput
        type='text'
        label='DESCRIPCION'
        name='description'
        register={register}
        rules={{ required: true }}
        errors={errors}
      />
      <FormInput
        type='text'
        label='PRECIO'
        name='price'
        register={register}
        rules={{ required: true }}
        errors={errors}
      />
      <FormInput
        type='text'
        label='CANTIDAD (STOCK)'
        name='stock'
        register={register}
        rules={{ required: true }}
        errors={errors}
      />
      <div className='form-group'>
        <select className='input'
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
      {/* <FormInput
        type='text'
        label='CATEGORIA PRODUCTO (ID)'
        name={'categoria.categoriaID'}
        register={register}
        rules={{ required: true }}
        errors={errors}
      /> */}
      <div className='pb-2 flex justify-end'>
        <Button
          type='primary'
        >
          REGISTRAR
        </Button>
      </div>
    </form>
  )
}

export default AddProduct