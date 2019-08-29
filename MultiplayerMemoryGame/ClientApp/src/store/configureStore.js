import { applyMiddleware, compose, createStore } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer } from './reducer';
import { install, combineReducers } from 'redux-loop';
import { signalRInvokeMiddleware } from './signalRMiddleware';

export default function configureStore(history, initialState) {      

   const middleware = [
       routerMiddleware(history),
       signalRInvokeMiddleware
    ];

    const rootReducer = combineReducers({
        reducer,
        routing: routerReducer
    });

    // In development, use the browser's Redux dev tools extension if installed
    const enhancers = [install()];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
        enhancers.push(window.devToolsExtension());
    }

    const store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );        

    return store;
}
