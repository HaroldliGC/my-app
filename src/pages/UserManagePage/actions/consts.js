export const ADD_READERUSER = "ADD_READERUSER";
export const DELETE_READERUSER = "DELETE_READERUSER";
export const EDIT_READERUSER = "EDIT_READERUSER";
export const CLEAR_READERUSER_STORE = "CLEAR_READERUSER_STORE";
export const INITIALIZATION_READERUSER = "INITIALIZATION_READERUSER";
export const USER_MESSAGE = "USER_MESSAGE";
export const USER_INIT_FORM = "USER_INIT_FORM";

export function addReaderUser(array){
    return{
        type: ADD_READERUSER,
        array
    }
}

export function deleteReaderUser(index){
    return{
        type:DELETE_READERUSER,
        index
    }
}

export function editReaderUser(text,index){
    return{
        type:EDIT_READERUSER,
        text,
        index
    }
}

export function clearReaderUserStore(){
    return{
        type:CLEAR_READERUSER_STORE
    }
}

export function initializationReaderUser(data) {
    return{
        type:INITIALIZATION_READERUSER,
        data
    }
}

export function showMessage(content,messageType){
    return{
        type: USER_MESSAGE,
        content,
        messageType
    }
}

export function initFormData(data) {
    return{
        type: USER_INIT_FORM,
        data
    }
}
