/*尾部组件*/

import React, { Component, PropTypes } from 'react';
import './footer.scss'
class TodoFooter extends Component {
    static propTypes = {
        totalCount:PropTypes.number.isRequired,
        doneCount:PropTypes.number.isRequired,
        deleteDoneTodos:PropTypes.func.isRequired,
        isAllDone:PropTypes.bool.isRequired
    };
    handleChange = ()=>{
        const {changeAllChecked,isAllDone} = this.props;
        changeAllChecked(!isAllDone);
    };
    render() {

      const {totalCount,doneCount,deleteDoneTodos,isAllDone}  = this.props;

    return (
        <div className="todo-footer">
          <label>
            <input type="checkbox" checked={isAllDone} onChange={this.handleChange}/>
          </label>
          <span>已经完成{doneCount}</span>/全部{totalCount}
          <button className="btn btn-danger" onClick={deleteDoneTodos}>清除已完成任务</button>
        </div>
    );
  }
}

export default TodoFooter;