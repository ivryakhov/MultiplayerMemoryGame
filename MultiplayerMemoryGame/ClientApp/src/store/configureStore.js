import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer } from './reducer';
import * as sagas from "./sagas";

export default function configureStore(history, initialState) {  
    const sagaMiddleware = createSagaMiddleware();

   const middleware = [
      sagaMiddleware,
      routerMiddleware(history)
    ];

    const rootReducer = combineReducers({
        reducer,
        routing: routerReducer
    });

    // In development, use the browser's Redux dev tools extension if installed
    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
        enhancers.push(window.devToolsExtension());
    }

    const store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );    

    for (let saga in sagas) {
        sagaMiddleware.run(sagas[saga]);
    }

    return store;
}
