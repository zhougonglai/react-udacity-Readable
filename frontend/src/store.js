import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from './reducers';

const middlewares = [thunk];

if(process.env.NODE_ENV !== 'production'){
  middlewares.push(logger);
  // 不知道如何 使用 多个 middleware
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

export default store;