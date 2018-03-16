export const NEW_OPERATOR = "NEW_OPERATOR";
export const DELETE_INFITEM = "DELETE_INFITEM";
export const EDIT_INF = "EDIT_INF";
export const INITIALIZATION_DATA = "INITIALIZATION_DATA";
export const CLEAR_STORE = "CLEAR_STORE";
export const UNDO = "UNDO";
export const REDO = "REDO";

export function newOperatorAction(array){
    return{
        type: NEW_OPERATOR,
        array
    }
}

export function deleteInfItem(index){
    return{
        type: DELETE_INFITEM,
        index
    }
}

export function editInf(text,index){
    return{
        type: EDIT_INF,
        text,
        index
    }

}

export function initializationData(data){
    return{
        type: INITIALIZATION_DATA,
        data
    }

}

export function clearStore(){
    return{
        type : CLEAR_STORE
    }
}

export function undoAction(){
    return{
        type : UNDO
    }
}

export function redoAction(){
    return{
        type : REDO
    }
}