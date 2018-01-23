import React from 'react';

import {view as TopMenu} from '../components/TopMenu';
/**
 * APP组件主要是用了复用导航条
 * @param  {[type]} options.children [description]
 * @return {[type]}                  [description]
 */
const App = ({children}) => {
  return (
    <div>
      <TopMenu />
      <div>{children}</div>
    </div>
  );
};

export default App;