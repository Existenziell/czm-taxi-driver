import { mapbox } from './mapbox.js'
import { COORDS } from './config.js'

export function initializeMap(map, newRequest) {
  let coordinates
  if (newRequest) {
    const { user, ride, price, pickupCoordinates } = newRequest.data
    coordinates = pickupCoordinates.split(',')
    const html = `
      <div>
          <h1>${user}</h1>
          <h2>${ride}</h2>
          <p>$${price}</p>
      </div>
    `
    new mapbox.Popup()
      .setLngLat(coordinates)
      .setHTML(html)
      .addTo(map)

    // Open marker popup on click
    map.on('click', 'unclustered-point', () => {
      new mapbox.Popup().setLngLat(coordinates).setHTML(html).addTo(map)
    })

    map.flyTo({
      center: coordinates,
      essential: true
    })
  } else {
    coordinates = COORDS
  }

  // Add geolocate control to the map.
  const geolocate = new mapbox.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
  })
  map.addControl(geolocate)
}
