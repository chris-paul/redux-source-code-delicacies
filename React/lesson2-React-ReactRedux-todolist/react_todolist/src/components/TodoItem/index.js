
/*列表组件*/

import React, { Component ,PropTypes } from 'react';
import './item.scss'

class TodoItem extends Component {
    static propTypes = {
        todo: PropTypes.object.isRequired,
        deleteTodo:PropTypes.func.isRequired,
        updateTodoChecked:PropTypes.func.isRequired
    };
    //状态改变的回调函数
    handleChange = ()=>{
        const {updateTodoChecked , todo} = this.props;
        todo.isDone = !todo.isDone;
        updateTodoChecked();
    };
    handleDel = ()=>{
        const {deleteTodo, todo,index} = this.props;
        if(confirm('确认要删除'+todo.title+'吗')){
            deleteTodo(index);
        }
    };
    handleEnter = ()=>{
        this.refs.li.style.background = '#aaa';
        this.refs.button.style.display = 'block'
    }
    handleLeave = ()=>{
        this.refs.li.style.background = '#fff';
        this.refs.button.style.display = 'none'
    }
  render() {
    const {isDone,title} = this.props.todo;
    return (
        <li onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave} ref='li'>
          <label>
            <input type="checkbox" checked={isDone} onChange={this.handleChange}/>
            <span>{title}</span>
          </label>
          <button className="btn btn-danger" style={{display:'none'}} onClick={this.handleDel} ref='button'>删除</button>
        </li>
    );
  }
}

export default TodoItem;