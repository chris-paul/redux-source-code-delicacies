/*头部组件*/

import React, { Component , PropTypes} from 'react'
import './header.scss'

class TodoHeader extends Component {
    static propTypes = {
        addTodo:PropTypes.func.isRequired
    };
    handleKeyUp = (e)=>{
        //判断是回车键
        if(e.keyCode === 13){
            //根据输入的数据生成todo对象，调用方法添加todo
            let title = e.target.value.trim();
            if(title === ''){
                return;
            }
            const todo = {
                title: title,
                isDone:false
            };
            this.props.addTodo(todo);
            e.target.value = "";
        }
    };
  render() {
    return (
   		<div className="todo-header">
   			<input type="text" placeholder="请输入你的任务名称,请按回车确认" onKeyUp={this.handleKeyUp}/>
   		</div>
    );
  }
}

export default TodoHeader;
