import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-directions/dist/mapbox-gl-directions.css'
import React from 'react'
import MapGL from 'react-map-gl'
import Directions from 'react-map-gl-directions'


// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN = process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN

const NewMap = () => {
  state = {
    viewport: {
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8,
    },
  }

  mapRef = React.createRef()

  handleViewportChange = (viewport) => {
    this.setState({
      viewport: {...this.state.viewport, ...viewport},
    })
  }

  return (
    <MapGL
      ref={this.mapRef}
      {...this.state.viewport}
      width="100%"
      height="100%"
      onViewportChange={this.handleViewportChange}
      mapboxApiAccessToken={MAPBOX_TOKEN}>
      <Directions mapRef={this.mapRef} mapboxApiAccessToken={MAPBOX_TOKEN} />
    </MapGL>
  )
}

export default NewMap
