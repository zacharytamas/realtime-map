import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import './App.css'
import mapboxConfig from './mapbox-config'

mapboxgl.accessToken = mapboxConfig.accessToken

function App() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-122.4194, 37.7749], // San Francisco coordinates
      zoom: 12,
      pitch: 75,
    })

    return () => {
      map.current?.remove()
    }
  }, [])

  useEffect(() => {
    if (!map.current) return

    new mapboxgl.Marker().setLngLat([-122.4194, 37.7749]).addTo(map.current)
  }, [map.current])

  return <div className="map-container" ref={mapContainer} />
}

export default App
