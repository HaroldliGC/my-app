import {LOGIN} from '../actions/index';

function OperateLogin (state=[],action){
    switch(action.type){
        case LOGIN:{
            let rec = [];
            rec.push(action.str);
            return rec;
        }
        default:
            return state;
    }
}

export default OperateLogin;