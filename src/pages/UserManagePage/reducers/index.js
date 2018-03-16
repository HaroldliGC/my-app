import {ADD_READERUSER, DELETE_READERUSER, EDIT_READERUSER, CLEAR_READERUSER_STORE,INITIALIZATION_READERUSER} from '../actions/consts';

function OperateReaderUser (state=[],action){
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

export default OperateReaderUser;