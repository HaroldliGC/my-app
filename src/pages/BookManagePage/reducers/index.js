
import {INIT_FORM, MESSAGE, NEW_OPERATOR, EDIT_INF, DELETE_INFITEM, INITIALIZATION_DATA, CLEAR_STORE } from "../actions/consts";
import {combineReducers} from 'redux';
import { reducer as formReducer} from 'redux-form';

function books (state=[],action){
    let newState = state.concat();
    switch(action.type){
        case NEW_OPERATOR:{
            newState.push(action.data);
            break;
        }
        case INITIALIZATION_DATA:{
            newState = action.data;
            break;
        }
        case DELETE_INFITEM:{
            const index = parseInt(action.index, 0);
            newState.splice(index,1);
            break;
        }
        case EDIT_INF:{
            const index = parseInt(action.index, 0);
            newState.splice(index,1,action.text);
            break;
        }
        case CLEAR_STORE:{
            newState = [];
            break;
        }
        default:
            return state;
    }
    return newState;
}

function initFormData (state={}, action){
    let newState = {...state};
    switch(action.type){
        case INIT_FORM:
            newState = action.data;
            break;
        default:
            return state;
    }
    return newState;
}

function messages (state={content:'',type:''},action){
    let newState = {...state};
    switch(action.type){
        case MESSAGE:
            newState.content = action.content;
            newState.type = action.messageType;
            break;
        default:
            return state;
    }
    return newState;
}

const OperateBook = combineReducers({
    books,
    messages,
    initFormData,
    form: formReducer
})

export default OperateBook;