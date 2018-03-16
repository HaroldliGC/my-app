import { ADD_ORDER, DELETE_ORDER, EDIT_ORDER, CLEAR_ORDER_STORE, INITIALIZATION_ORDER} from '../actions/consts';

export default function OperateOrder (state=[],action){
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
            var index = parseInt(action.index);
            let rec = state.concat();
            rec.splice(index,1);
            return rec;
        }
        case EDIT_ORDER:{
            var index = parseInt(action.index);
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