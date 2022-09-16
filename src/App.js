import React, {useRef, useEffect, useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxLanguage from '@mapbox/mapbox-gl-language';

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom,] = useState(15);

  const [watchId, setWatchId] = useState(null);

  const startWatchPosition = () => {
    const watchId = navigator.geolocation.watchPosition(position => {
      const {latitude, longitude} = position.coords;
      setLat(latitude)
      setLng(longitude)
    })
    setWatchId(watchId)
  }

  const stopWatchPosition = () => {
    navigator.geolocation.clearWatch(watchId)
    setWatchId(null)
  }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    const language = new MapboxLanguage();
    map.current.addControl(language);

    // Create a new marker.
    marker.current = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map.current);
  });

  useEffect(() => {
    map.current.on('load', () => {
      map.current.addSource('earthquakes', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
      });

      map.current.addLayer({
        'id': 'earthquakes-layer',
        'type': 'circle',
        'source': 'earthquakes',
        'paint': {
          'circle-radius': 4,
          'circle-stroke-width': 2,
          'circle-color': 'red',
          'circle-stroke-color': 'white'
        }
      });
    });
  })

  // useEffect(() => {
  //   if (!map.current) return; // wait for map to initialize
  //   map.current.on('move', () => {
  //     setLng(map.current.getCenter().lng.toFixed(4));
  //     setLat(map.current.getCenter().lat.toFixed(4));
  //     setZoom(map.current.getZoom().toFixed(2));
  //   });
  // });

  useEffect(() => {
    startWatchPosition()
    return stopWatchPosition()
  })

  useEffect(() => {
    map.current.flyTo({
      center: [lng, lat],
      zoom: zoom
    });
    marker.current.setLngLat([lng, lat])
  }, [lat, lng, zoom])


  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
