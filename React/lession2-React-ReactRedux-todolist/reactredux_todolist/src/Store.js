import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import {reducer as todoReducer} from './todos';
import {reducer as filterReducer} from './filter';

import Perf from 'react-addons-perf'

/*createStore只能接受一个reducer,所以使用这*/
const reducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer
});


export default createStore(reducer, {});