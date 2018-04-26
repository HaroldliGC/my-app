export const INIT_BOOK_BY_NUMBER = "INIT_BOOK_BY_NUMBER";
export const INIT_BOOK_BY_REVIEW = "INIT_BOOK_BY_REVIEW";
export const ANALYSIS_MESSAGE = "ANALYSIS_MESSAGE";

export function initBookByNumber(data){
    return{
        type: INIT_BOOK_BY_NUMBER,
        data
    }
}

export function initBookByReview(data){
    return{
        type: INIT_BOOK_BY_REVIEW,
        data
    }
}

export function showMessage(content,messageType){
    return{
        type: ANALYSIS_MESSAGE,
        content,
        messageType
    }
}