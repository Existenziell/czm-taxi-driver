/* eslint-disable react-hooks/exhaustive-deps */

import useApp from "../context/AppContext"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { initializeMap } from '../lib/initializeMap'
import { COORDS } from '../lib/config'
// import { addDataLayer } from '../lib/addDataLayer'
import 'mapbox-gl/dist/mapbox-gl.css'

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')

const MapComponent = () => {
  const { ctxMap, setCtxMap, newRequest } = useApp()
  const router = useRouter()
  const [pageIsMounted, setPageIsMounted] = useState(false)

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

  useEffect(() => {
    setPageIsMounted(true)

    let mapTheme = 'light'
    if (localStorage?.theme === 'dark') {
      mapTheme = 'dark'
    }

    const map = new mapboxgl.Map({
      container: 'map',
      style: `mapbox://styles/mapbox/${mapTheme}-v10`,
      // style: 'mapbox://styles/mapbox/satellite-v9',
      // style: 'mapbox://styles/mapbox/streets-v11',
      // style: 'mapbox://styles/mapbox/navigation-night-v1',
      center: COORDS,
      zoom: 13,
    })

    initializeMap(map)
    setCtxMap(map)
  }, [router.query.location])

  // const location = {
  //   type: "FeatureCollection",
  //   features: [
  //     {
  //       type: "Feature",
  //       id: "CZMTaxiApp",
  //       properties: {
  //         name: 'CZMTaxi',
  //         subname: "Cozumel",
  //         image: "1",
  //         cluster: false,
  //         event_count: 1,
  //         venue: "transportation",
  //       },
  //       geometry: {
  //         type: "Point",
  //         coordinates: COORDS
  //       }
  //     }
  //   ]
  // }

  useEffect(() => {
    if (pageIsMounted) {
      ctxMap.on('load', () => {
        // addDataLayer(ctxMap, location)
      })
    }
  }, [pageIsMounted, ctxMap])

  useEffect(() => {
    if (newRequest) {
      initializeMap(ctxMap, newRequest)
    }
  }, [newRequest, ctxMap])

  return (
    <div id='map' className='w-full h-[calc(100vh-80px)]' />
  )
}

export default MapComponent
