import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const RealtimeComponent = dynamic(() => import('../components/RealtimeComponent'), { ssr: false });

export default function Home() {
  return (
    <div>
      <Head>
        <title>CZMTaxi Driver</title>
        <meta name="description" content="Taxi done the right way" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex flex-col items-center justify-center px-8'>
        <h1 className='mt-8 text-2xl'>CZMTaxi</h1>
        <p className='mb-10 italic'>Driver&apos;s Corner</p>
        <RealtimeComponent />
      </main>
    </div>
  )
}
