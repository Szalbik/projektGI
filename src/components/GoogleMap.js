import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 52.409538, lng: 16.931992 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 52.409538, lng: 16.931992 }} />}
  </GoogleMap>
))

export default MyMapComponent