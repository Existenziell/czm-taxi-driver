import mapbox from 'mapbox-gl'
mapbox.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
const key = {}

export { mapbox, key }
