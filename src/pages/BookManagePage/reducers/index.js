
import { NEW_OPERATOR, EDIT_INF, DELETE_INFITEM, INITIALIZATION_DATA, CLEAR_STORE } from "../actions/consts";

function OperateBook (state=[],action){
    switch(action.type){
        case NEW_OPERATOR:
            return [...state,action.array];
        case INITIALIZATION_DATA:{
            const length = action.data.length;
            let rec = [];
            for (let i=0; i<length; i++){
                rec.push(action.data[i]);
            }
            return rec;
        }
        case DELETE_INFITEM:{
            var index = parseInt(action.index);
            let rec = state.concat();
            rec.splice(index,1);
            return rec;
        }
        case EDIT_INF:{
            var index = parseInt(action.index);
            let rec = state.concat();
            rec.splice(index,1,action.text);
            return rec;
        }
        case CLEAR_STORE:{
            return [];
        }
        default:
            return state;
    }
}


export default OperateBook;