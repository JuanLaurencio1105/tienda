import axios from '../api/axios'
import FormInput from '../form/FormInput'
import Button from '../components/Button'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
const Login = () => {

  const [loged, setIsLoged] = useState('')
  const { login } = useContext(UserContext)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/auth/login', data)
      console.log(response.data)
      login(response.data)
      navigate('/clientes')
    } catch (error) {
      console.log(error.response.data, 'LOGIN FAILED',)
      setIsLoged(error.response.data)
    }
  }

  const { handleSubmit, register, formState: { errors } } = useForm()
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-gray-100'>
      <div className='w-80 m-auto bg-red-400 p-5 rounded-lg py-12'>
        <div className='flex justify-center items-center'>
          <h2 className='text-2xl font-medium'>INICIAR SESION</h2>
        </div>
        <form method='post' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 pt-4'>
          <FormInput
            type='text'
            label='Nombre de usuario'
            name='userName'
            register={register}
            rules={{ required: true }}
            errors={errors}
          />
          <FormInput
            type='text'
            label='CORREO'
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
          <div className='flex justify-center items-center gap-4'>
            <Button
              type='primary'
            >
              ENVIAR
            </Button>
          </div>
          {
            loged === 'EL USUARIO NO ESTA AUTORIZADO' && (
              <span>EL USUARIO NO ESTA AUTORIZADO</span>
            )
          }
        </form>
      </div>
    </div>
  )
}

export default Login