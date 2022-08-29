import Notification from './Notification'

const Layout = ({ children }) => {
  return (
    <>
      <Notification />
      <main className='w-full'>
        {children}
      </main>
    </>
  )
}

export default Layout
