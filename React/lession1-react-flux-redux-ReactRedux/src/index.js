
/*(001-006)为了方便查看所有的实例都写在了一个工程下,在我们没有接触react-redux框架之前,
我们渲染组件的方式如下*/

/*import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
*/
/*
import加载commonJS模块默认转换为default,
ES6加载模块默认是静态加载，是同步的，传递的是引用（会在文件加载提升）
CommonJS是默认运行时候加载，用到了才会加载，传递的是引用的复制
*/


/*007以后,我们主要使用react-redux组件进行开发,因为使用了provider的方式进行store数据的传递,
所以我们按照如下方式进行组件的渲染
*/

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import ControlPanel from './components/006ReactReduxCounter/views/ControlPanel';
import store from './components/006ReactReduxCounter/Store.js';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <ControlPanel/>
  </Provider>,
  document.getElementById('root')
  );

