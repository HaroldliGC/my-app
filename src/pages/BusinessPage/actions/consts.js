export const ADD_ORDER = "ADD_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";
export const EDIT_ORDER = "EDIT_ORDER";
export const CLEAR_ORDER_STORE = "CLEAR_ORDER_STORE";
export const INITIALIZATION_ORDER = "INITIALIZATION_ORDER";

export function addOrder(array){
    return{
        type: ADD_ORDER,
        array
    }
}

export function deleteOrder(index){
    return{
        type: DELETE_ORDER,
        index
    }
}

export function editOrder(text, index){
    return{
        type:EDIT_ORDER,
        text,
        index
    }
}

export function clearOrderStore(){
    return{
        type:CLEAR_ORDER_STORE
    }
}

export function initializationOrder(data){
    return{
        type: INITIALIZATION_ORDER,
        data
    }
}
