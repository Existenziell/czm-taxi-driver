export function addDataLayer(map, data) {
  map.addSource('taxi', {
    type: 'geojson',
    data,
    cluster: false,
    clusterMaxZoom: 14,
    clusterRadius: 50,
    clusterProperties: {},
  })

  map.addLayer({
    id: 'unclustered-point',
    type: 'circle',
    source: 'taxi',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-radius': 12,
      'circle-color': '#C90076',
      'circle-opacity': 0.75,
      'circle-stroke-width': 4,
      'circle-stroke-color': '#fff',
      'circle-stroke-opacity': 0.5,
    },
  })

  map.addLayer({
    id: 'event-count',
    type: 'symbol',
    source: 'taxi',
    filter: ['!', ['has', 'point_count']],
    layout: {
      'text-field': '',
      'text-font': ['Open Sans Bold'],
      'text-size': 16,
    },
    paint: {
      'text-color': 'white',
    },
  })
}
