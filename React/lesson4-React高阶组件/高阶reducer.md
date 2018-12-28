### reducer代码的复用

+ 在复杂的应用中，我们使用combineReducers将一个reducer拆分成很多小的reducer，但是这些小的reducer
如何利用重复的代码呢？

+ 假设有A和B两个组件的UI很相似,但是A和B是不能公用一个reducer的,因为当A模块改变数据的时候,B模块的数据也会改变，
A和B模块将会显示一样的内容。所以我们必须意识到：在一个应用中，不同模块间的actionType必须是全局唯一的

#### 使用加前缀的方式重用reducer

+ 这样只要A和B模块分别调用createCounterWithNamedType来生成相应的reducer

```javascript
function createCounterWithNamedType(counterName = '') {
    return function counter(state = 0, action) {
        switch (action.type) {
            case `INCREMENT_${counterName}`:
                return state + 1;
            case `DECREMENT_${counterName}`:
                return state - 1;
            default:
                return state;
        }
    }
}
```
#### 高阶reducer

+ 所谓的高阶reducer就是指函数接受一个现有的reducer和参数，并返回一个新的reducer

+ 例如上面的例子我们可以使用一个高阶reducer来完成

```javascript

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
function createNamedWrapperReducer(reducerFunction, reducerName) {
  return (state, action) => {
    const { name } = action
    const isInitializationCall = state === undefined
    if (name !== reducerName && !isInitializationCall) return state

    return reducerFunction(state, action)
  }
}
const rootReducer = combineReducers({
  counterA: createNamedWrapperReducer(counter, 'A'),
  counterB: createNamedWrapperReducer(counter, 'B'),
  counterC: createNamedWrapperReducer(counter, 'C')
})
```
+ redux-undo就是典型的利用高阶reducer来增强reducer的例子，它主要作用是使任意reducer变成可以执行撤销和重做的全新reducer

```javascript
function undoable(reducer) {
    const initialState = {
        // 记录过去的state
        past: [],
        // 以一个空的action调用reducer来产生当前值的初始值
        present: reducer(undefined, {}),
        // 记录后续的state
        future: []
    };

    return function(state = initialState, action) {
        const { past, present, future } = state;

        switch(action.type) {
            case '@@redux-undo/UNDO':
                const previous = past[past.length - 1];
                const newPast = past.slice(0, past.length - 1);

                return {
                    past: newPast,
                    present: previous,
                    future: [ present, ...future ]
                };
            case '@@redux-undo/REDO':
                const next = future[0];
                const newFuture = future.slice(1);

                return {
                    past: [ ...past, present ],
                    present: next,
                    future: newFuture
                };
            default:
                // 将其他action委托给原始的reducer处理
                const newPresent = reducer(present, action);

                if(present === newPresent) {
                    return state;
                }

                return {
                    past: [ ...past, present ],
                    present: newPresent,
                    future: []
                };
        }
    };
}

//使用高阶reducer
import { createStore } from 'redux';

function todos(state = [], action) {
    switch(action.type) {
        case: 'ADD_TODO':
        // ...
    }
}

const undoableTodos = undoable(todos);
const store = createStore(undoableTodos);

store.dispatch({
    type: 'ADD_TODO',
    text: 'Use Redux'
});

store.dispatch({
    type: 'ADD_TODO',
    text: 'Implement Undo'
});

store.dispatch({
    type: '@@redux-undo/UNDO'
});
```
