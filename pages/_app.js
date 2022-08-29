import '../styles/globals.css'
import { AppProvider } from '../context/AppContext'
import Layout from '../components/_Layout'

function CZMTaxi({ Component, pageProps }) {
  return (
    <AppProvider>
      <Layout >
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
}

export default CZMTaxi
