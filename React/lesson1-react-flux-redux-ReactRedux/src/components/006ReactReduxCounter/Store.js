
import {createStore} from 'redux';
import reducer from './Reducer.js';

const initValues = {
  'First': 0,
  'Second': 10,
  'Third': 20
};
/**
 * 作为store必须包括,subscribe,getstate,dispatch(这是provider的硬性要求)
 * @type {[type]}
 */
const store = createStore(reducer, initValues);

export default store;