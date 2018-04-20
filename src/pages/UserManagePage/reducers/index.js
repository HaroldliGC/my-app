import { USER_INIT_FORM, USER_MESSAGE, ADD_READERUSER, DELETE_READERUSER, EDIT_READERUSER, CLEAR_READERUSER_STORE,INITIALIZATION_READERUSER} from '../actions/consts';
import {combineReducers} from 'redux';

function users (state=[],action){
    switch(action.type){
        case ADD_READERUSER:
            return [...state,action.array];
        case INITIALIZATION_READERUSER:{
            const length = action.data.length;
            let rec = [];
            for (let i=0; i<length; i++){
                rec.push(action.data[i]);
            }
            return rec;
        }
        case DELETE_READERUSER:{
            var index = parseInt(action.index);
            let rec = state.concat();
            rec.splice(index,1);
            return rec;
        }
        case EDIT_READERUSER:{
            var index = parseInt(action.index);
            let rec = state.concat();
            rec.splice(index,1,action.text);
            return rec;
        }
        case CLEAR_READERUSER_STORE:{
            return [];
        }
        default:
            return state;
    }
}

function initFormData (state={}, action){
    let newState = {...state};
    switch(action.type){
        case USER_INIT_FORM:
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
        case USER_MESSAGE:
            newState.content = action.content;
            newState.type = action.messageType;
            break;
        default:
            return state;
    }
    return newState;
}

const OperateReaderUser = combineReducers({
    users,
    messages,
    initFormData
})

export default OperateReaderUser;