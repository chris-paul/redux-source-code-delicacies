import React from 'react';
/**
 * 只要有缓存就不用重新渲染
 * @param  {[type]} WrappedComponent [description]
 * @return {[type]}                  [description]
 */
const cacheHOC = (WrappedComponent) => {
  return class NewComponent extends WrappedComponent {
    shouldComponentUpdate(nextProps, nextState) {
      return nextProps.useCache;
    }
  }
}

export default cacheHOC;