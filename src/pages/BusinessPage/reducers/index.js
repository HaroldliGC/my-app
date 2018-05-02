import {ORDER_MESSAGE, ORDER_INIT_FORM ,ADD_ORDER, DELETE_ORDER, EDIT_ORDER, CLEAR_ORDER_STORE, INITIALIZATION_ORDER} from '../actions/consts';
import {combineReducers} from 'redux';
import { reducer as formReducer} from 'redux-form';

function orders (state=[],action){
    switch(action.type){
        case ADD_ORDER:
            return [...state,action.array];
        case INITIALIZATION_ORDER:{
            const length = action.data.length;
            let rec = [];
            for (let i=0; i<length; i++){
                rec.push(action.data[i]);
            }
            return rec;
        }
        case DELETE_ORDER:{
            const index = parseInt(action.index, 0);
            let rec = state.concat();
            rec.splice(index,1);
            return rec;
        }
        case EDIT_ORDER:{
            const index = parseInt(action.index, 0);
            let rec = state.concat();
            rec.splice(index,1,action.text);
            return rec;
        }
        case CLEAR_ORDER_STORE:{
            return [];
        }
        default:
            return state;
    }
}

function initFormData (state={}, action){
    let newState = {...state};
    switch(action.type){
        case ORDER_INIT_FORM:
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
        case ORDER_MESSAGE:
            newState.content = action.content;
            newState.type = action.messageType;
            break;
        default:
            return state;
    }
    return newState;
}

const OperateOrder = combineReducers({
    orders,
    messages,
    initFormData,
    form: formReducer
})

export default OperateOrder;