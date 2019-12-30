import React from 'react'
import  { compose, withProps, lifecycle } from 'recompose'
import {withScriptjs, withGoogleMap,GoogleApiWrapper, GoogleMap, DirectionsRenderer,Marker} from 'react-google-maps'
import { getProject} from "../../actions/projectActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createProject} from "../../actions/projectActions";
import classnames from "classnames";
export class MyMapComponent extends React.Component {
  constructor(props){
    super(props)
    
  }
  
   

render() {
  



  
    const DirectionsComponent = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCL3qzgqg6P8crdHBcQMnOQo7KWFnOkpVs&callback=initMap",
        loadingElement: <div style={{ height: `400px` }} />,
        containerElement: <div style={{ width: `100%` }} />,
        mapElement: <div style={{height: `600px`, width: `600px` }}  />,
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() { 
          const DirectionsService = new window.google.maps.DirectionsService();
          DirectionsService.route({
            origin: new window.google.maps.LatLng(31.6, -8.100),
            destination: new window.google.maps.LatLng(31.8, -8.6),
            travelMode: window.google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
this.setState({
                directions: {...result},
                markers: true
              })
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });
        }
      })
    )(props =>
      <GoogleMap
        defaultZoom={3}
      >

        {props.directions && <DirectionsRenderer directions={props.directions} suppressMarkers={props.markers}/>}
   
      </GoogleMap>
    );
return (
  <div>
        <DirectionsComponent/>
        </div>
    );
  }
}
 
export default MyMapComponent
