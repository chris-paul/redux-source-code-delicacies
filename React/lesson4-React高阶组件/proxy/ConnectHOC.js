import React from 'react';

const doNothing = () => ({});

function connect(mapStateToProps=doNothing, mapDispatchToProps=doNothing) {
  /**
   * 通过displayName可以给组件命名,这样通过connect产生的组件调试起来更方便,
   * 否则所有的容器都是同一个名字
   * @param  {[type]} WrappedComponent [description]
   * @return {[type]}                  [description]
   */
  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component';
  }

  return function(WrappedComponent) {
    class HOCComponent extends React.Component {
      constructor() {
        super(...arguments);

        this.onChange = this.onChange.bind(this);

        this.store = {};
      }

      /*
      //TODO: make a workable shouldComponentUpdate
      shouldComponentUpdate(nextProps, nextState) {
        for (const propType in nextProps) {
          if (nextProps.hasOwnProperty(propType)) {
            if (nextProps[propType] === this.props[propType]) {
              return true;
            }
          }
        }
        for (const propType in this.props) {
          if (this.props.hasOwnProperty(propType)) {
            if (nextProps[propType] === this.props[propType]) {
              return true;
            }
          }
        }
        return false;
      }
      */

      componentDidMount() {
        this.context.store.subscribe(this.onChange);
      }

      componentWillUnmount() {
        this.context.store.unsubscribe(this.onChange);
      }

      onChange() {
        this.setState({});
      }

      render() {
        const store = this.context.store;
        const newProps = {
          ...this.props,
          ...mapStateToProps(store.getState(), this.props),
          ...mapDispatchToProps(store.dispatch, this.props)
        }

        return <WrappedComponent {...newProps} />;
      }
    };

    HOCComponent.contextTypes = {
      store: React.PropTypes.object
    }
    /**
     * ES6的模板字符串语法,比如WrappedComponent的新组件的名字是connect(WrappedComponent)
     * @type {[type]}
     */
    HOCComponent.displayName = `Connect(${getDisplayName(WrappedComponent)})`;

    return HOCComponent;
  };
}

export default connect;