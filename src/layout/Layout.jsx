import SideBar from '../navmenu/SideBar'
import Header from '../components/Header'
const Layout = ({ children }) => {
  return (
    <div className='flex h-screen min-h-screen'>
      <SideBar />
      <div className='w-full h-full'>
        <Header />
        <div className='p-4 bg-dark'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout