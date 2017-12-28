import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import {reducer as todoReducer} from './todos';
import {reducer as filterReducer} from './filter';
import Perf from 'react-addons-perf';
const win = window;
win.Perf = Perf
const reducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer
});

const middlewares = [];
const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

export default createStore(reducer, {}, storeEnhancers);