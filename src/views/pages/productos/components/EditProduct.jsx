import { useForm } from 'react-hook-form'
import Modal from '../../../../components/Modal'
import FormInput from '../../../../form/FormInput'
import { useEffect, useState } from 'react'
import axios from '../../../../api/axios'
import Button from '../../../../components/Button'

const EditProduct = ({ closeModal, getProductos, productos }) => {

  const [category, setCategory] = useState([])
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onUpdate = async (data) => {
    try {
      await axios.put(`productos/${productos.id}`, data)
      getProductos()
      closeModal()
      // console.log(data)
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
          label='NOMBRE DEL PRODUCTO'
          name='nameProduct'
          register={register}
          rules={{ required: true }}
        />
        <FormInput
          type='text'
          errors={errors}
          label='DESCRIPCION'
          name='description'
          register={register}
          rules={{ required: true }}
        />
        <FormInput
          type='text'
          errors={errors}
          label='PRECIO'
          name='price'
          register={register}
          rules={{ required: true }}
        />
        <FormInput
          type='text'
          errors={errors}
          label='CANTIDAD'
          name='stock'
          register={register}
          rules={{ required: true }}
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
        <div>
          <Button
            type='primary'
          >
            ACTUALIZAR
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default EditProduct