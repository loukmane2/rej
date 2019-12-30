 import React, { Component } from 'react';
 import {useEffect, useState} from "react";
 import {Link } from "react-router-dom";
 import PropTypes from "prop-types";
 import {connect} from 'react-redux';
 import {getProjects} from "../../actions/projectActions";
 import { Map, GoogleApiWrapper, Marker, DirectionsService, DirectionsRenderer  } from 'google-maps-react';
 import ProjectItem from "./ProjectItem";

 
export class MapContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        
        stores: [{}]
                
        };
     
    }

    
   
  
    displayMarkers = () => {
      return this.state.stores.map((store,index) => {
        return <Marker key={index} id={store} position={{
          photo: store.photos,
         name: store.projectName,
          lat: store.altitude,
         lng: store.longitude
       }}
       
       onClick={() => 
          alert("nom de la place: "+store.projectName)
          //afficher(store.photos)
      
      } />
      
      }
      
      )

      

      
     
    
    }

    
  
    render() {

        const {project} = this.props;
        const {projects} = this.props.projects;
      
var z=[];
       var y=[];
       var x=[];
       x.push(this.props.projects);
       
       if(x!=undefined){
        x.forEach(element => {
         
            if(element!=undefined){
              console.log("elt is2  :",element);
            element.forEach(elt => {
                console.log("elt is  :",elt.altitude);
                y.push(elt);
            });
        }
        });
    }
    
    console.log("elt isy  :",y);
    
    this.state = {  
        stores:y }

        console.log("stattt  :",this.state.longitude);
       
      return (
<div>
            
        
        <Map google={this.props.google} travelMode={window.google.maps.TravelMode.DRIVING} initialCenter={{ lat: 31.630000, lng: -8.008889}}  zoom={8}>
  
        {this.displayMarkers()}
        
      
         </Map> 
         </div>
         );
    }
  }

  const mapStatetoProps = state =>({
    project:state.project

})

 
  MapContainer= GoogleApiWrapper({
    apiKey: 'AIzaSyCL3qzgqg6P8crdHBcQMnOQo7KWFnOkpVs'
  })(MapContainer);
  export default connect(mapStatetoProps, {getProjects})  (MapContainer);



  