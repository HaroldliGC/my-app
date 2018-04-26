import {INIT_BOOK_BY_NUMBER, INIT_BOOK_BY_REVIEW, ANALYSIS_MESSAGE} from '../actions/consts';
import {combineReducers} from 'redux';

function bookByNumber (state=[], action){
    let newState = state.concat();
    switch(action.type){
        case INIT_BOOK_BY_NUMBER:{
            newState = action.data;
            break;
        }
        default:
            return state;
    }
    return newState;
}

function bookByReview (state=[], action){
    let newState = state.concat();
    switch(action.type){
        case INIT_BOOK_BY_REVIEW:{
            newState = action.data;
            break;
        }
        default:
            return state;
    }
    return newState;
}

function messages (state={content:'',type:''},action){
    let newState = {...state};
    switch(action.type){
        case ANALYSIS_MESSAGE:
            newState.content = action.content;
            newState.type = action.messageType;
            break;
        default:
            return state;
    }
    return newState;
}

const OperateAnalysis = combineReducers({
    bookByNumber,
    bookByReview,
    messages
})

export default OperateAnalysis;