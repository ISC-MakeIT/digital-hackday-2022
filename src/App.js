import React, {useRef, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoidGFtYWdyYW0iLCJhIjoiY2w4Mnhxdm16MDBjajNwcXI1Z3ExaXoxZSJ9.UvQSNs_jPKq2FJvQlFIb7Q';


export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  const [watchId, setWatchId] = useState(null);
  // const [position, setPosition] = useState({latitude: 42.35, longitude: -70.9})

  const startWatchPosition = () => {
    const watchId = navigator.geolocation.watchPosition(position => {
      const {latitude, longitude} = position.coords;
      // setPosition({latitude, longitude})
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
  });

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
  }, [lat, lng])

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
