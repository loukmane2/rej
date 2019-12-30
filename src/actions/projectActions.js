import axios from "axios";

import {GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT} from "./types";

export const createProject = (project, history) => async dispatch  => {
    try {
const res = await axios.post("http://18.218.4.254:8080/api/project",project)
history.push("/dashboard")
dispatch({
    type: GET_ERRORS,
    payload: {}
})
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}



export const getProjects = () => async dispatch => {

    const res = await axios.get("http://18.218.4.254:8080/api/project/all")
    dispatch ({
        type: GET_PROJECTS,
        payload: res.data
    })
}

export const getProject = (id,history) => async dispatch => {
try {
    const res = await axios.get(`http://18.218.4.254:8080/api/project/get/${id}`)
    dispatch ({
        type: GET_PROJECT, 
        payload: res.data
    })
} catch (error) {
    history.push("/dashboard");
}
    
}

export const deleteProject = (id) => async dispatch => {
    
    const res=await axios.get(`http://18.218.4.254:8080/api/project/delete/${id}`)
    if(window.confirm("are you sure? this will delete the project and all the data related to it")){
        dispatch ({
            type: DELETE_PROJECT, 
            payload: id
        })
    }  
    

    }