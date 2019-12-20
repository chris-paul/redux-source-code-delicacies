### react是数据驱动DOM,所以除了优化渲染过程还需要优化数据的获取过程
+ 下面是我们根据state筛选不同状态的todoitem,每一次都重新遍历去取数据,如果todos和filter字段都没有变化,实在没有必要去重新取一次数据
```javascript
const selectVisibleTodos = (todos, filter) => {
  switch (filter) {
    case FilterTypes.ALL:
      return todos;
    case FilterTypes.COMPLETED:
      return todos.filter(item => item.completed);
    case FilterTypes.UNCOMPLETED:
      return todos.filter(item => !item.completed);
    default:
      throw new Error('unsupported filter');
  }
}

const mapStateToProps = (state) => {
  return {
    todos: selectVisibleTodos(state.todos, state.filter)
  };
}
```
+ reselect选择器进行数据获取的优化,createSelector是一个高阶函数,,第一个参数是函数数组,主要是state的映射,他会将这次的值和上一次的值进行比较,如果没有变化,就不会执行第二个函数,而是直接使用缓存,否则将第一个参数的结果作为第二个函数的参数进行数值的运算,虽然createSelector接受的参数是纯函数,但是他本身并不是纯函数

```javascript
npm install --save reselect

import {createSelector} from ’ reselect’; 
import {FilterTypes} from ’.. /constants. j s ’;
const getFilter = (state) => state.filter; 
const getTodos = (state) => state.todos;
export const selectVisibleTodos = createSelector( 
    [getFilter, getTodos],
    (filter, todos) => {
        switch (filter) { 
        case FilterTypes.ALL:
             return todos;
        case FilterTypes.COMPLETED: 
              return todos.filter(item =>item.completed};
        case FilterTypes.UNCOMPPLETED: 
               return todos.filter(item => !item.completed); 
        default: throw new Error (’unsupported filter ’); 
           }
       }
   )     
const mapStateToProps = (state) => { 
    return { 
        todos: selectVisibleTodos(state) 
    }
}
```       
