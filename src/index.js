import React from "react";
import ReactDOM from "react-dom";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import OperatorSets from './reducers/index';
import undoable from './Reducer Enhancer';
import Root from "./Root";

const logger = store =>next =>action => {
    console.log("dispatching", action);
    let result = next(action);
    console.log("next state", store.getState());
    return result;
}

const enhancer = compose(
    applyMiddleware(thunk, logger)
);

const undoableOperatorSets = undoable(OperatorSets);
let store = createStore(undoableOperatorSets,enhancer);

//let store = createStore(OperatorSets,applyMiddleware(logger));

ReactDOM.render(
    <Root store={store}>
    </Root>,
    document.getElementById("root")
)
