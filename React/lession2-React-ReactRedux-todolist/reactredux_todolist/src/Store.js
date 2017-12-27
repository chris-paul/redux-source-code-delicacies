import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import {reducer as todoReducer} from './todos';
import {reducer as filterReducer} from './filter';

const reducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer
});

const middlewares = [];
const storeEnhancers = compose(
  applyMiddleware(...middlewares)
);

export default createStore(reducer, {}, storeEnhancers);