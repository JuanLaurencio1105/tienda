import React, { useEffect, useState } from 'react'
import Button from '../../../components/Button'
import Thead from '../../../components/Thead'
import ListClients from './components/ListClients'
import axios from '../../../api/axios'
import useModal from '../../../hooks/useModal'
import Modal from '../../../components/Modal'
import CreateClientsForm from './components/CreateClientsForm'
import Layout from '../../../layout/Layout'
import { SiMicrosoftexcel } from 'react-icons/si'
import { BsFiletypePdf } from 'react-icons/bs'
import toast, { Toaster } from 'react-hot-toast'


const Clients = () => {

  const thead = ['#', 'NOMBRES', 'APELLIDOS', 'CORREO', 'TELEFONO', 'DIRECCION', 'ACCIONES']

  const { isOpen, closeModal, openModal } = useModal()
  const [clientes, setClientes] = useState([])
  const [searchClient, setSearchClient] = useState('')

  const [isOpenExport, setIsOpenExport] = useState(false)
  const toggleButtonsExport = () => {
    setIsOpenExport(!isOpenExport)
  }

  const searcher = (e) => {
    setSearchClient(e.target.value)
  }

  let results = []
  const resultsFiltered = clientes.filter((cliente) => cliente.names.toLowerCase().includes(searchClient.toLowerCase()))

  if (searchClient !== resultsFiltered) {
    results = resultsFiltered.filter((dato) => dato.names.toLowerCase().includes(searchClient.toLowerCase()))
  }

  const getClients = async () => {
    try {
      const response = await axios.get('clientes')
      setClientes(response.data)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const exportPDF = async () => {
    try {
      const response = await axios.get('clientes/exportarPDF', {
        responseType: 'blob',
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url

      const contentDisposition = response.headers['content-disposition']
      const fileNameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"$/)
      const fileName = fileNameMatch ? fileNameMatch[1] : 'Clientes.pdf';

      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  const exportExcel = async () => {
    try {
      const response = await axios.get('clientes/exportarExcel', {
        responseType: 'blob',
      })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url

      const contentDisposition = response.headers['content-disposition']
      const fileNameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"$/)
      const fileName = fileNameMatch ? fileNameMatch[1] : 'Clientes.xlsx';

      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const newShowToast = (options) => {
    const { type, message } = options
    switch (type) {
      case 'success':
        toast.success(message)
        break;
      case 'error':
        toast.error(message)
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    getClients()

    const closeButtonsExport = () => setIsOpenExport(false)
    window.addEventListener('mousedown', closeButtonsExport)
    return () => window.removeEventListener('mousedown', closeButtonsExport)
  }, [])

  return (
    <Layout>
      {
        isOpen && (
          <Modal title='REGISTRO DE NUEVO CLIENTE' closeModal={closeModal}>
            <CreateClientsForm closeModal={closeModal} getClients={getClients} toast={newShowToast} />
          </Modal>
        )
      }
      <Toaster position='top-right' toastOptions={{ duration: 5000 }} />
      <div className='card'>
        <div className='flex justify-between gap-4'>
          <div className='flex justify-center items-center gap-4'>
            <Button
              type='primary'
              onClick={openModal}
            >
              Nuevo Cliente
            </Button>
            <div>
              <div className='form-group'>
                <input
                  className='input'
                  type='text'
                  placeholder=' '
                  value={searchClient}
                  onChange={searcher}
                />
                <label className='label'>Buscar Clientes</label>
              </div>
            </div>
          </div>
          <div className='relative'>
            <Button onClick={toggleButtonsExport} type='primary'>
              Exportar
            </Button>
            {isOpenExport && (
              <div
                onMouseDown={(e) => e.stopPropagation()}
                className='absolute top-10 right-0 z-50 bg-darkSecondary text-white px-4 py-2 rounded-md border border-gray-400'
              >
                <button onClick={exportExcel} className='flex justify-start items-center gap-2 px-4 py-2 rounded-md hover:bg-slate-600'>
                  <SiMicrosoftexcel size={20} />
                  <span>Excel</span>
                </button>
                <hr />
                <button onClick={exportPDF} className='flex justify-start items-center gap-2 px-4 py-2 rounded-md hover:bg-slate-600'>
                  <BsFiletypePdf size={20} />
                  <span>PDF</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <table className='table'>
          <Thead headers={thead} />
          <tbody>
            {
              resultsFiltered.map((cliente, index) => (
                <ListClients
                  index={index}
                  key={cliente.id}
                  cliente={cliente}
                  getCliente={getClients}
                  toast={newShowToast}
                // toastDelete={showToastDelete}
                />
              ))
            }
          </tbody>
          <tbody>
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default Clients