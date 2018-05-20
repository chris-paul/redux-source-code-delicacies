/*应用组件*/

import React, { Component } from 'react'
import TodoHeader from '../TodoHeader'
import TodoMain from '../TodoMain'
import TodoFooter from '../TodoFooter'
import './app.scss'


class App extends Component {
	constructor(props){
		super(props);
		this.state = {
		    todos:[{isDone:false,title:'吃饭'},{isDone:false,title:'睡觉'}],
            isAllDone:false
        }
	}
	addTodo = (todo) =>{
	    const todos  = this.state.todos;
	    todos.unshift(todo);
	    this.setState({
	        todos,
            isAllDone:false //添加新的isALlDone是false
	    });
    };
	getUndoneTodos = ()=>{
	    return this.state.todos.filter(todo=>!todo.isDone);
    }
    //更新的todo的isDone的值
    updateTodoChecked = ()=>{
	    const todos = this.state.todos;
	    this.setState({
	        todos,
            //有todo，没有选中的个数是0
            isAllDone:this.getUndoneTodos().length===0&&todos.length>0
        })
    };
	//删除指定下标的todo
    deleteTodo = (index)=>{
        const todos = this.state.todos;
        todos.splice(index,1);
        this.setState({
            todos,
            isAllDone:this.getUndoneTodos().length===0&&todos.length>0
        });
    }
    //删除所以选中的
    deleteDoneTodos = ()=>{
        const todos = this.state.todos.filter(todo=>!todo.isDone);
        this.setState({
            todos,
            isAllDone:false
        });
    };
    //设置所有todos的选中状态
    changeAllChecked = (isAllDone)=>{
        const todos = this.state.todos;
        todos.forEach(todo=>{todo.isDone = isAllDone});
        this.setState({
            isAllDone,
            todos
        });
    };
    render() {
	    //定义向main组件传递的props
	    const mainProps = {
	        todos:this.state.todos,
            updateTodoChecked:this.updateTodoChecked,
            deleteTodo:this.deleteTodo
        };
	    const footerProps = {
	        totalCount:this.state.todos.length,
            doneCount:this.state.todos.filter(todo => todo.isDone).length,
            deleteDoneTodos:this.deleteDoneTodos,
            isAllDone:this.state.isAllDone,
            changeAllChecked:this.changeAllChecked,
        };
	    return (
			<div className="todo-container">
				<div className="todo-wrap">
					<TodoHeader addTodo={this.addTodo}/>
					<TodoMain {...mainProps}/>
					<TodoFooter {...footerProps}/>
				</div>
			</div>
		);
  }
}

export default App;
