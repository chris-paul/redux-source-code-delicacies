import React, { PropTypes } from 'react';
import * as Actions from '../Actions.js';
import {connect} from 'react-redux';

const buttonStyle = {
  margin: '10px'
};

function Counter({caption, onIncrement, onDecrement, value}) {
  return (
    <div>
      <button style={buttonStyle} onClick={onIncrement}>+</button>
      <button style={buttonStyle} onClick={onDecrement}>-</button>
      <span>{caption} count: {value}</span>
    </div>
  );
}

Counter.propTypes = {
  caption: PropTypes.string.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};

/**
 * connect方法创建容器组件,这个方法通过容器组件将store的值作为props传递给傻瓜组件
 * @param  {[type]} state    [store的值]
 * @param  {[type]} ownProps [组件本身的props]
 * @return {[type]}          [description]
 */
function mapStateToProps(state, ownProps) {
  return {
      value: state[ownProps.caption]
    }
  }
  /**
   * connect方法创建容器组件,通过将傻瓜组件用方法封装,通过props的方式传递给傻瓜组件
   * @param  {[type]} dispatch [description]
   * @param  {[type]} ownProps [description]
   * @return {[type]}          [description]
   */
  function mapDispatchToProps(dispatch, ownProps) {
    return {
      onIncrement: () => {
        dispatch(Actions.increment(ownProps.caption));
    },
    onDecrement: () => {
      dispatch(Actions.decrement(ownProps.caption));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);