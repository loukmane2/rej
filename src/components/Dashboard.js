  import React, {Component} from 'react' 
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from './Project/CreateProjectButton';
import {connect} from "react-redux";
import {getProjects} from "../actions/projectActions";
import PropTypes from "prop-types";
import {  Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { MapContainer } from './Project/MapContainer';
import { MyMapComponent } from './Project/MyMapComponent';





class Dashboard extends Component{

   
    constructor(props) {
        super(props);
    this.state = {
        
        stores: [{}]
                
        };
    }
    componentDidMount() {
        this.props.getProjects();
        
    }
   
    

    render(){
       const {projects} = this.props.project;
       
       console.log("projev122  :",this.props.project.projects);
       console.log("projev1  :",this.props.project);

       
       
        return (
            /* <!-- Dashboard Component (Project Item included) --> */
     
    <div className="projects">
    <div className="container">
    
        <div className="row">
            <div className="col-md-12">
             
                <h1 className="display-4 text-center">Sites</h1>
                <div id="lol"></div>
                <br />
                <CreateProjectButton/>
                <br />
                <hr />
                {  projects && projects.map(project => (
                    <ProjectItem key={project.id} project={project} />
                    ))
                    }
                    <MyMapComponent/>
                      
                     
                      
                    
                      
                            
            </div>
            
  
            </div>
    </div>
    
</div>

/* <!-- End of Dashboard Component --> */


          
        );
        
    } 
  }
    

Dashboard.propTypes ={
    project: PropTypes.object.isRequired,
    getProjects: PropTypes.func.isRequired
}

const mapStatetoProps = state =>({
    project:state.project

})


export default connect(mapStatetoProps, {getProjects}) (Dashboard);
