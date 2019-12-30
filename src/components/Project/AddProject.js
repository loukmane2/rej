  import React, { Component } from 'react'
  import PropTypes from "prop-types"
  import {connect} from "react-redux"
  import {createProject} from "../../actions/projectActions"
// import { connect } from 'http2';
  import classnames from "classnames";
  var r;
 class AddProject extends Component {
     
    constructor(){

        super()
        this.state={
            projectName:"",
            projectIdentifier:"",
            description:"",
            start_date:"",
            end_date:"",
            altitude:"",
            longitude:"",
            imagePreviewUrl:"",
            errors:{}
        }; 
        this._handleImageChange = this._handleImageChange.bind(this);
        this.onChange= this.onChange.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        
     }
    

     getBase64(e) {
        var file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.setState({
            path: reader.result
          })
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        }
      }

     componentWillReceiveProps(nextProps){
         if(nextProps.errors){
             this.setState({
                 errors:nextProps.errors
             }); 
         }
    
     }

     onChange(e){
           this.setState({[e.target.name]:e.target.value});
           
     }
     _handleImageChange(e){
        //var logFile = $('#draftlog').get(0).files[0];
        let reader = new FileReader();
        //reader.readAsText(logFile);
        let file = e.target.files[0];
        var rawLog
        console.log("eee",e.target.files[0]);
        reader.onloadend = function(e) {
            r=reader.result;
            console.log(reader.result);
             this.state={
            file:file,
            imagePreviewUrl : reader.result

        };
        console.log("azzzzzz",this.state.imagePreviewUrl);
        }
       
        
        console.log("eeeeeeeeeeee",reader);
       
        reader.readAsDataURL(file);
    }
     onSubmit(e){
         e.preventDefault();
         console.log("aaaaaaaaa",r);
        
         const data = r.split(',')[1];
         console.log("aaaaaaaaa1111",data);
         var raw = window.atob(data);
console.log(raw);
        
         var rawlenght =raw.length
         var array = new Uint8Array(new ArrayBuffer(rawlenght));
         for(var i=0; i<rawlenght;i++){
            array[i] = raw.charCodeAt(i);
        }
        const imge =[];
         for(var i=0; i<rawlenght;i++){
             imge.push((array[i]));
         }
         const newProject={
            projectName:this.state.projectName, 
            projectIdentifier:this.state.projectIdentifier,
            description:this.state.description,
            start_date:this.state.start_date,
            end_date:this.state.end_date,
            altitude:this.state.altitude,
            longitude:this.state.longitude,
            image: imge
         };
         console.log("newproject111",newProject); 
         this.props.createProject(newProject,this.props.history)
         console.log("newproject",newProject); 
     }
     
    render() {

        const{errors}= this.state
        
        
        return (
            <div>
            
                <h1>Add project form</h1>
            
                <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create   site form</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className={classnames("form-control form-control-lg ",{"is-invalid":errors.projectName})} placeholder="Project Name" name="projectName" value={this.state.projectName}  onChange={this.onChange}/>
                                    {errors.projectName &&(
                                        <div className="invalid-feedback">
                                        {errors.projectName}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input type="text" className={classnames("form-control form-control-lg ",{"is-invalid":errors.projectIdentifier})} placeholder="Unique Project ID" name="projectIdentifier" value={this.state.projectIdentifier} onChange={this.onChange}/>
                                    
                                    {errors.projectIdentifier &&(
                                        <div className="invalid-feedback">
                                        {errors.projectIdentifier}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="form-group">
                                    <textarea className={classnames("form-control form-control-lg ",{"is-invalid":errors.description})} placeholder="Project Description" name="description" value={this.state.description} onChange={this.onChange}></textarea>
                                    {errors.description &&(
                                        <div className="invalid-feedback">
                                        {errors.description}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <textarea type="number" className={classnames("form-control form-control-lg ")} placeholder="altitude" name="altitude" value={this.state.altitude} onChange={this.onChange}></textarea>
                                   
                                </div>

                                <div className="form-group">
                                    <textarea type="number" className={classnames("form-control form-control-lg ")} placeholder="longitude" name="longitude" value={this.state.longitude} onChange={this.onChange}></textarea>
                                   
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="start_date" value={this.state.start_date} onChange={this.onChange}/>
                                    
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="end_date" value={this.state.end_date} onChange={this.onChange}/>
                                    
                                </div>

                                <h6>Insert image</h6>
                                <div className="form-group">
                                    <input type="file" className="btn btn-primary  mt-4" name="path"  onChange={this._handleImageChange}/>
                                   
                                </div>
        
                                <input type="submit" className="btn btn-primary btn-block mt-4" value="submit"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
                </div>

        )
    }
}

AddProject.propTypes={
    
    createProject: PropTypes.func.isRequired, 
    errors: PropTypes.object.isRequired
   
};

const mapStateToProps = state =>({
    errors: state.errors
    
})
export default connect(mapStateToProps,{createProject}) (AddProject);
 
