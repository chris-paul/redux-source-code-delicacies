import React from 'react';
/**
 * 去掉组件的user属性
 * @param  {[type]} WrappedComponent [description]
 * @return {[type]}                  [description]
 */
function removeUserProp(WrappedComponent) {
  return function newRender(props) {
    const {user, ...otherProps} = props;
    return <WrappedComponent {...otherProps} />
  }
}

export default removeUserProp;