import React from 'react';
/**
 * 操纵refs,会立即取得这个组件的DOM节点并记录在_root中
 * @param  {[type]} WrappedComponent [description]
 * @return {[type]}                  [description]
 */
const refsHOC = (WrappedComponent) => {
  return class HOCComponent extends React.Component {
    constructor() {
      super(...arguments);

      this.linkRef = this.linkRef.bind(this);
    }

    linkRef(wrappedInstance) {
      this._root = wrappedInstance;
    }

    render() {
      const props = {...this.props, ref: this.linkRef};
      return <WrappedComponent {...props}/>;
    }
  };
};

export default refsHOC;