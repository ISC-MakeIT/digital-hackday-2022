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
      map.current.addSource('store', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        // data: '../example.json'
        data: {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [139.5924792859, 35.459082011]
              },
              "properties": {
                "id": "J001270044",
                "name": "つきじ海賓 星川店",
                "name_kana": "つきじかいひん　ほしかわてん",
                "address": "神奈川県横浜市保土ケ谷区星川２－５－２２",
                "station_name": "星川",
                "genre": {
                  "name": "和食",
                  "catch": "宅配寿司なら「つきじ海賓」"
                },
                "average": "",
                "access": "相鉄本線星川(神奈川)駅南口より徒歩約4分",
                "urls": {
                  "pc": "https://www.hotpepper.jp/strJ001270044/?vos=nhppalsa000016"
                },
                "photo": {
                  "pc": {
                    "s": "https://imgfp.hotp.jp/IMGH/88/68/P037818868/P037818868_58_s.jpg"
                  },
                  "Mobile": {
                    "s": "https://imgfp.hotp.jp/IMGH/88/68/P037818868/P037818868_100.jpg"
                  }
                },
                "open": "月～日、祝日、祝前日: 11:00～20:45",
                "close": "年中無休",
                "midnight": "営業していない"
              }
            }
          ]
        }
      });

      map.current.addLayer({
        'id': 'store-layer',
        'type': 'circle',
        'source': 'store',
        'paint': {
          'circle-radius': 10,
          'circle-stroke-width': 2,
          'circle-color': 'red',
          'circle-stroke-color': 'white'
        }
      });

      map.current.on('click', 'store-layer', (e) => {
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(e.features[0].properties.name)
          .addTo(map.current);
      });

      // Change the cursor to a pointer when
      // the mouse is over the states layer.
      map.current.on('mouseenter', 'store-layer', () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });

      // Change the cursor back to a pointer
      // when it leaves the states layer.
      map.current.on('mouseleave', 'store-layer', () => {
        map.current.getCanvas().style.cursor = '';
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
