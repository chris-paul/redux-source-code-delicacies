### 一、使用react-redux创建的项目
```javascript
create-react-app reactredux_todolist
cnpm install react-redux --save 
```
### 二、理解bindActionCreators

  + 我们常常需要将容器组件的一些方法绑定到子组件当中,但是我们很多方法只是简单的把参数dispatch出去,并没有做其它的事情
```javascript
const mapDispatchToProps = (dispatch) => { 
return { 
  onToggleTodo: (id) => { dispatch(toggleTodo(id)); 
  onRemoveTodo: (id) => { dispatch(removeTodo(id));   
  }
}
```
  + bindActionCreators方法与上面效果相同,但是少写了很多重复代码
```javascript
import {bindActionCreators) from 'redux'; 
const mapDispatchToProps = (dispatch) => bindActionCreators({ 
   onToggleTodo: toggleTodo, 
   onRemoveTodo: removeTodo ), 
dispatch);     
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```
   + 更近一步,在项目中往往这样写(state.TodoList)
```javascript
 connect(
     (state)=>state.todos,
     (dispatch)=>({
         actions:bindActionCreators(actions, dispatch)
     })
 )(TodoList);   
```
### 三、理解combineReducers

  + 一个项目分为了很多组件,所以我们一个项目一个reducer简直就是一个痛苦,所以combineReducers方法用来将多个reducer合成一个reducer,通过对reducer键值对的形式指定,此时也可以取得不同 组件之间的store,比如state.todos 
```javascript
const reducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer
});
```

### 四、理解applyMiddleware   

    这个有点复杂,有一篇单独的分析

### 五、理解React 高阶函数compose
  
+ 什么是高阶组件和高阶函数

 接收函数作为输入，或者输出另一个函数的一类函数，被称作高阶函数。对于高阶组件，它描述的便是接受React组件作为输入，输出一个新的React组件的组件。

    + createStore的第三个参数,传入高阶函数增强createStore
```javascript
/*下面是createStore的部分源码,*/     
  export default function createStore(reducer, preloadedState, enhancer) {
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }
    //可以看到enhancer增强createStore
    return enhancer(createStore)(reducer, preloadedState)
  }
```      
  + compose
 compose可以帮助我们组合任意个（包括0个）高阶函数，例如compose(a,b,c)返回一个新的函数d，函数d依然接受一个函数作为入参，只不过在内部会依次调用c,b,a，从表现层对使用者保持透明。


###  六、react性能分析 reactPerf
 
  + 首先下载google插件reactperf,截至目前react的最新版是16,但是reactPerf最多支持15,所以我们降低了react的版本
  
   cnpm install react-addons-perf

  + react-addons-perf     
  ```javascript
  import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
  import {reducer as todoReducer} from './todos';
  import {reducer as filterReducer} from './filter';
   import Perf from 'react-addons-perf';
   const win = window;
   win.Perf = Perf
   const reducer = combineReducers({
     todos: todoReducer,
     filter: filterReducer
   });
   const middlewares = [];
   const storeEnhancers = compose(
     applyMiddleware(...middlewares),
     (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
   );
   export default createStore(reducer, {}, storeEnhancers);
  ```

 ### 七、理解 combindReducer
 + createStore只能接受一个reducer,所以我们必须将多个reducer合并为一个
 ```javascript
  /**
  * 
  * 检验reducer函数的合法性,因为state[key]返回undefiend,所以initalState的初始值不能是undefined
  * 不然就永远无法为state设置key
  *
  * @version  [version]
  * @param    {[type]}   reducers [description]
  * @return   {[type]}            [description]
  */
  function assertReducerSanity(reducers) {  
    Object.keys(reducers).forEach(key => {  
        var reducer = reducers[key]  
        var initialState = reducer(undefined, { type: ActionTypes.INIT })  
        if (typeof initialState === 'undefined') {  
            throw new Error(  
            `Reducer "${key}" returned undefined during initialization. ` +  
            `If the state passed to the reducer is undefined, you must ` +  
            `explicitly return the initial state. The initial state may ` +  
            `not be undefined.`  
        )  
    }  
    //检验随机的一个type是否会返回undefined。
    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.')  
      if (typeof reducer(undefined, { type }) === 'undefined') {  
        throw new Error(  
          `Reducer "${key}" returned undefined when probed with a random type. ` +  
          `Don't try to handle ${ActionTypes.INIT} or other actions in "redux/*" ` +  
          `namespace. They are considered private. Instead, you must return the ` +  
          `current state for any unknown actions, unless it is undefined, ` +  
          `in which case you must return the initial state, regardless of the ` +  
          `action type. The initial state may not be undefined.`  
        )  
      }  
    })  
}  
 export default function combindReducer(reducers) {
    // 第一个只是先过滤一遍 把非function的reducer过滤掉
  const reducerKeys = Object.keys(reducers)
  const finalReducers = {}
  reducerKeys.forEach((key) => {
      if(typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
      } 
  })
  //检验reducer的合法性
  try {  
    assertReducerSanity(finalReducers)  
  } catch (e) {  
    sanityError = e  
  }  
  const finalReducersKeys = Object.keys(finalReducers)
    // 第二步比较重要 就是将所有reducer合在一起
    // 根据key调用每个reducer，将他们的值合并在一起
    let hasChange = false;
    const nextState = {};
    /**
     * 该开始的时候createStore dispatch({ type: ActionTypes.INIT })初始化数据,state一般是一个对象
     * 或者是字符串,所以state[key]肯定是undefined,所以assertReducerSanity必须队initstate做出校验 
     * @param    {Object}   state  [唯一数据源]
     * @param    {[type]}   action [action纯函数]
     * @return   {[type]}          [description]
     */
    return function combind(state={}, action) {
        finalReducersKeys.forEach((key) => {
            const previousValue = state[key];
            const nextValue = reducers[key](previousValue, action);
            nextState[key] = nextValue;
            hasChange = hasChange || previousValue !== nextValue
        })
        return hasChange ? nextState : state;
    }
}
 ``` 
