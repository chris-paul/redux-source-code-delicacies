import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import {syncHistoryWithStore} from 'react-router-redux';

import App from './pages/App.js';
//import Home from './pages/Home.js';
//import About from './pages/About.js';
//import NotFound from './pages/NotFound.js';
import store from './Store.js';

const createElement = (Component, props) => {
  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
};
/**
 * [description]
 * @param  {[type]}   nextState [当前的router信息]
 * @param  {Function} callback  [组件加载完成的回掉函数]
 * @return {[type]}             [description]
 */
const getHomePage = (nextState, callback) => {
  require.ensure([], function(require) {
    callback(null, require('./pages/Home.js').default);
  }, 'home');
};

const getAboutPage = (nextState, callback) => {
  require.ensure([], function(require) {
    callback(null, require('./pages/About.js').default);
  }, 'about');
};

const getNotFoundPage = (nextState, callback) => {
  /**
   * require函数
   * @param  {[type]} require  [这个数组是组件加载之前要]            
   * @param  {[type]} 函数     [加载模块的函数,在函数执行之前,第一个参数的数组文件已经加载]
   * @return {[type]}          [模块名]
   */
  require.ensure([], function(require) {
    callback(null, require('./pages/NotFound.js').default);
  }, '404');
};

const history = syncHistoryWithStore(browserHistory, store);
//const history = browserHistory;
/**
 * getComponent接受两个参数,nextState表示当前的路由信息,第二个参数是一个回调函数
 * callback回调函数第一个参数是错误信息,第二个参数表示加载成功的组件
 * @return {[type]} [description]
 */
const Routes = () => (
  <Router history={history} createElement={createElement}>
    <Route path="/" component={App}>
      <IndexRoute getComponent={getHomePage} />
      <Route path="home" getComponent={getHomePage} />
      <Route path="about" getComponent={getAboutPage} />
      <Route path="*" getComponent={getNotFoundPage} />
    </Route>
  </Router>
);

export default Routes;