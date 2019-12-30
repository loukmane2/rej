 import React, { Component } from 'react';
 import {Link } from "react-router-dom";
 import PropTypes from "prop-types";
 import {connect} from 'react-redux';
 import {deleteProject} from "../../actions/projectActions";
 import { MyMapComponent } from './MyMapComponent';
 
 class ProjectItem extends Component {
    constructor(){
        super()
        
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }  
    
    onDeleteClick = id =>{
        this.props.deleteProject(id);
         console.log("projectd:",id);
     };
    

    render() {
        
       const {project} = this.props;
       let image = 'data:image/png;base64, '+project.image;
         return (
          
             <div className="container">
             <div className="card card-body bg-light mb-3">
                 <div className="row">
                 
                     <div className="col-2">
                     <img className="card-img-top"  src={image} alt="card image cap"/>
                         <span className="mx-auto">{project.projectIdentifier}</span>

                     </div>
                     <div className="col-lg-6 col-md-4 col-8">
                         <h3>{project.projectName}</h3>
                         <p>{project.description}</p>
                         <p>{project.altitude}</p>
                         <p>{project.longitude}</p>
                     </div>
                     <div className="col-md-4 d-none d-lg-block">
                         <ul className="list-group">
                              <a href="#">
                                 <li className="list-group-item board">
                                     <i className="fa fa-flag-checkered pr-1"> Sites Board </i>
                                 </li>
                             </a>
                             <Link to={`/updateProject/${project.projectIdentifier}`}>
                             
                                 <li className="list-group-item update">
                                     <i className="fa fa-edit pr-1 text-success"> Update Site Info</i>
                                 </li>
                                 </Link>
                                 <Link to="#" onClick={() => this.onDeleteClick(project.projectIdentifier)}> 
                                 <li className="list-group-item delete" >
                                
                                 <i className="fa fa-minus-circle pr-1 text-danger" > Delete Site</i>
                                 </li>
     
                                 </Link> 
                                 <Link to={`/mapContainer/${project.projectIdentifier}`} >
                             
                                 <li className="list-group-item update">
                                     <i className="fa fa-edit pr-1 text-success"> plot site</i>
                                 </li>
                                 </Link>
                         </ul>
                     </div>
                 </div>
             </div>
         </div>
         
         )
     }
 }
 
 ProjectItem.propTypes={
     deleteProject: PropTypes.func.isRequired
 }
 

 export default connect(null, {deleteProject})  (ProjectItem);


