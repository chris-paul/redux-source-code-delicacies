import React, { Component, PropTypes } from 'react';

import * as Actions from '../Actions.js';
import CounterStore from '../stores/CounterStore.js';

const buttonStyle = {
  margin: '10px'
};

class Counter extends Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onClickIncrementButton = this.onClickIncrementButton.bind(this);
    this.onClickDecrementButton = this.onClickDecrementButton.bind(this);
    /*初始化state*/
    this.state = {
      count: CounterStore.getCounterValues()[props.caption]
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.caption !== this.props.caption) ||
           (nextState.count !== this.state.count);
  }
  /**
   * 当组件加载完成的时候,监听了CounterStore的onchang事件
   * @return {[type]} [description]
   */
  componentDidMount() {
    CounterStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    CounterStore.removeChangeListener(this.onChange);
  }
  /**
   * 因为监听了onchange事件,所以只要counter的值发生变化就会调用此函数
   * @return {[type]} [description]
   */
  onChange() {
    const newCount = CounterStore.getCounterValues()[this.props.caption];
    this.setState({count: newCount});
  }
  /**
   * 通知action去改变store
   * @return {[type]} [description]
   */
  onClickIncrementButton() {
    Actions.increment(this.props.caption);
  }

  onClickDecrementButton() {
    Actions.decrement(this.props.caption);
  }

  render() {
    const {caption} = this.props;
    return (
      <div>
        <button style={buttonStyle} onClick={this.onClickIncrementButton}>+</button>
        <button style={buttonStyle} onClick={this.onClickDecrementButton}>-</button>
        <span>{caption} count: {this.state.count}</span>
      </div>
    );
  }
}

Counter.propTypes = {
  caption: PropTypes.string.isRequired
};

export default Counter;