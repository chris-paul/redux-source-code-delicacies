import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

import * as reducers from '../reducers';
//使用 redux-thunk 之后，可以dispatch一个函数了,不然只能dispatch一个纯对象
let middlewares = [thunk];

// if (process.env.NODE_ENV === 'development') {
//   const logger = require('redux-logger');
//   middlewares = [...middlewares, logger];
// }
//compose从右到左把接收到的函数合成后的最终函数.注意返回的是一个函数而函数的参数是createStore这个函数(函数式编程),通过finalCreateStore
//依次执行中间件修改dispatch函数最终返回增强后的store
const finalCreateStore = compose(
  applyMiddleware(...middlewares)
)(createStore);

export default function configureStore(initialState) {
  //combineReducers合并多个reducer函数并返回一个新的reducer函数,当createStore的时候就是循环执行每一个reducer
  const reducer = combineReducers({...reducers, routing: routerReducer});
  const store = finalCreateStore(reducer, initialState);
//如果是开发环境的话
  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducers = require('../reducers');
      const nextReducer = combineReducers({...nextReducers, routing: routerReducer});
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
