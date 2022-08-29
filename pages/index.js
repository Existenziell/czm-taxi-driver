import Head from 'next/head'
import Header from '../components/Header'
import MapComponent from '../components/Map'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>CZMTaxi Driver</title>
        <meta name="description" content="Taxi done the right way" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex flex-col items-center justify-center'>
        <Header />
        <MapComponent />
        <Sidebar />
      </main>
    </div>
  )
}
