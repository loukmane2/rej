import {GET_PROJECTS,GET_PROJECT, DELETE_PROJECT} from "../actions/types";

const initialState ={
    project: [],
    project: {}
};

export default function(state = initialState, action){

    switch(action.type){
        
        case GET_PROJECTS:
        return{
            ...state,
            projects:action.payload
        };

        case GET_PROJECT: 
        console.log( " reducer project:",action.payload);
        
        return  {
             ...state,
             project: action.payload 
        };
        case DELETE_PROJECT:
                console.log( " delete project:",action.payload);
            return {
                ...state,
                projects: state.projects.filter(project=> project.projectIdentifier !== action.payload )
            };
        default:
            return state;
    }
}