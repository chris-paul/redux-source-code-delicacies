import React from 'react';
/**
 * 重新产生一个新的组件,给这个新的组件传入新的参数
 * @param  {[type]} WrappedComponent [description]
 * @return {[type]}                  [description]
 */
const modifyPropsHOC = (WrappedComponent) => {
  return class NewComponent extends WrappedComponent {
    render() {
      const elements = super.render();

      const newStyle = {
        color: (elements && elements.type === 'div') ? 'red' : 'green'
      }
      const newProps = {...this.props, style: newStyle};

      return React.cloneElement(elements, newProps, elements.props.children);
    }
  };
};

export default modifyPropsHOC;