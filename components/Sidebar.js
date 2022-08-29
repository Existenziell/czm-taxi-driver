import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid'
import { motion, AnimatePresence } from "framer-motion"
import { useState } from 'react'
import { mapbox } from '../lib/mapbox'
import useApp from "../context/AppContext"

const Sidebar = () => {
  const { ctxMap, receivedRequests, broadcast } = useApp()
  const [open, setOpen] = useState(false)

  const handleTakeover = async (request) => {
    setOpen(false)
    ctxMap.flyTo({
      center: request.pickupCoordinates.split(','),
      essential: true
    })
    const html = `
      <div>
          <h1>${request.user}</h1>
          <p>${request.pickup} - ${request.dropoff}</p>
          <h2>${request.ride}</h2>
          <p>$${request.price}</p>
      </div>
    `
    new mapbox.Popup()
      .setLngLat(request.pickupCoordinates.split(','))
      .setHTML(html)
      .addTo(ctxMap)

    broadcast("czmTaxiResponse", request)
  }

  return (
    <AnimatePresence>
      <motion.div key={'sidebar'}
        animate={{ x: open ? 0 : -280 }}
        className={`${open ? '' : 'opacity-60'} transition-opacity w-max -left-8 absolute top-28 bottom-10 overflow-hidden bg-cta z-20 rounded-tr-lg rounded-br-lg pl-12 pr-4 py-4`}>
        <ul>
          {receivedRequests.map(request => {
            const { ride, price, pickup, dropoff, duration, distance } = request.data
            return (
              <li
                key={Math.random() * 1000}
                className='mb-2 bg-brand bg-opacity-40 px-2 py-1 rounded-sm hover:shadow transition-all text-sm'>
                <div className='flex items-center justify-between gap-4'>
                  <p>
                    {pickup} <ArrowLongRightIcon className='w-6 relative bottom-[1px] inline-block' /> {dropoff} ({ride})<br />
                    {distance.toFixed(2)}km - {parseInt(duration / 60)}min - ${price}
                  </p>
                  <button onClick={() => handleTakeover(request.data)} className='button' aria-label="Take Ride">Take</button>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="absolute right-0 top-1/2">
          <button onClick={() => (setOpen(!open))} aria-label="Toggle Sidepanel">
            {open ?
              <ChevronDoubleLeftIcon className='text-brand-dark w-10 hover:text-black' />
              :
              <ChevronDoubleRightIcon className='text-brand-dark w-10 hover:text-black' />
            }
          </button>
        </div>
      </motion.div>
    </AnimatePresence >

  )
}
export default Sidebar
