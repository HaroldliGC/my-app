
export default function undoable(reducer) {
    const initialState = {
        past : [],
        present : reducer(undefined,{}),
        future : [],
    }
    return function (state = initialState, action){
        const {past, present, future} = state;
        switch(action.type){
            case "UNDO" : 
                const previous = past[past.length - 1];
                const newPast = past.slice(0, past.length - 1);
                return{
                    past : newPast,
                    present : previous,
                    future : [present,...future]
                }
            case "REDO" :
                const next = future[0];
                const newFuture = future.slice(1);
                return {
                    past : [...past, present],
                    present : next,
                    future : newFuture
                }
            default:
                const newPresent = reducer(present,action);
                if (present === newPresent){
                    //console.log("===");
                    return state;
                }
                //console.log("!=");
                return {
                    past : [...past, present],
                    present : newPresent,
                    future : []
                }
        }
    }
} 