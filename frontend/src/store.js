import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from './reducers';

let middlewares;

if(process.env.NODE_ENV !== 'production'){
  middlewares = applyMiddleware(thunk, logger);
}else{
  middlewares = applyMiddleware(thunk);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(middlewares)
)

export default store;