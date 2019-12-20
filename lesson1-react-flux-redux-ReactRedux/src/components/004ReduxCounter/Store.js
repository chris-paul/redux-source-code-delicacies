import {createStore} from 'redux';
import reducer from './Reducer.js';

const initValues = {
  'First': 0,
  'Second': 10,
  'Third': 20
};
/**
 * 一个应用只有一个store,create封装了store的注册,也就是我们所说的reducer函数,
 * 这个reducer函数要传入action和state,state用来更新视图,action是出发某一个动作的回调
 * 用来更新store的值
 * @type {[type]}
 */
const store = createStore(reducer, initValues);

export default store;