import React, {useEffect} from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import {
  RulerControl,
  StylesControl,
  CompassControl,
  ZoomControl,
} from 'mapbox-gl-controls';

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN
const App = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [-73.985664, 40.748514],
      zoom: 12,
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
    });

    // Directions
    map.addControl(directions, 'top-left');

    // Ruler
    map.addControl(new RulerControl(), 'top-right');
    map.on('ruler.on', () => console.log('ruler: on'));
    map.on('ruler.off', () => console.log('ruler: off'));

    // Styles
    map.addControl(new StylesControl(), 'bottom-left');

    // Compass
    map.addControl(new CompassControl(), 'top-right');

    // Zoom
    map.addControl(new ZoomControl(), 'top-right');
  });
  return <div className="mapWrapper" id="map" />;
};

export default App;
