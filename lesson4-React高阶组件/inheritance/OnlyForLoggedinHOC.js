import React from 'react';
/**
 * 重写父组件的生命周期,这个组件只有在登录的时候才显示
 * @param  {[type]} WrappedComponent [description]
 * @return {[type]}                  [description]
 */
const onlyForLoggedinHOC = (WrappedComponent) => {
  return class NewComponent extends WrappedComponent {
    render() {
      if (this.props.loggedIn) {
        return super.render();
      } else {
        return null;
      }
    }
  }
}

export default onlyForLoggedinHOC;