import SideBar from '../navmenu/SideBar'
import Header from '../components/Header'
const Layout = ({ children }) => {
  return (
    <div className='flex'>
      <section>
        <SideBar />
      </section>
      <div className='w-full'>
        <Header />
        <div className='p-4'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout