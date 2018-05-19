import React, {PropTypes} from 'react';
//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {toggleTodo, removeTodo} from '../actions.js';

class TodoItem extends React.Component {
  constructor() {
    super(...arguments);

    console.log('enter TodoItem constructor: ' + this.props.text);
  }
  componentWillReceiveProps(nextProsp){
    console.log(nextProsp);
    //每次产生的函数引用都不相同
    console.log(nextProsp.onToggle === this.props.onToggle)
  }
 /* shouldComponentUpdate(){
    console.log("是否更新")
    return true;
  }*/
  render() {
    const {onToggle, onRemove, completed, text } = this.props;

    console.log('enter TodoItem render: ' + text);

    return (
      <li className="todo-item"
        style={{
          textDecoration: completed ? 'line-through' : 'none'
        }}
      >
        <input className="toggle" type="checkbox" checked={completed ? "checked" : ""} readOnly onClick={onToggle} />
        <label className="text">{text}</label>
        <button className="remove" onClick={onRemove}>×</button>
      </li>
    );
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const {id} = ownProps;
  return {
    onToggle: () => dispatch(toggleTodo(id)),
    onRemove: () => dispatch(removeTodo(id))
  }
};

export default connect(null, mapDispatchToProps)(TodoItem);