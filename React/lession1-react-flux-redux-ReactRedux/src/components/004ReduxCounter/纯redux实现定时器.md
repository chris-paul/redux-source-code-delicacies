### 安装redux
	npm install --save redux

### 比较redux和flux的不同之处

+ flux有多个store但是redux只有一个store,所以所有的dispatch都只需要派发到一个store就好了,所以redux把Dispatch封装为了一个函数

+ action的处理的事请不同
```javascript
//在flux中,action完成事件的派发,View调用的是action
export const increment = (counterCaption) => {
  AppDispatcher.dispatch({
    type: ActionTypes.DECREMENT,
    counterCaption: counterCaption
  });
};

Actions.increment(this.props.caption);
//在redux中在view中通过store.dispatch派出action,这个时候action是一个纯函数
export const decrement = (counterCaption) => {
  return {
    type: ActionTypes.DECREMENT,
    counterCaption: counterCaption
  };
};

store.dispatch(Actions.decrement(this.props.caption));
```
+ 简化了store的创建,
	 + 一个应用只有一个store,createStore封装了store的注册,也就是我们所说的reducer函数
	 + 这个reducer函数要传入action和state,state的副本通过与原来的值的对比判断是否广播
	 + 一个state对应了一个viewreducer用来更新视图,action是触发某一个动作的回调用来更新store的值	
+ flux继承了nodejs的EventEmitter,但是redux只要使用了消息的订阅和发布机制，下面是简单的模拟createStore(https://zhuanlan.zhihu.com/p/25863768)
```javascript
// 以下代码示例来自redux官方教程
const createStore = (reducer) => {
let state;
let listeners = [];
// 用来返回当前的state
const getState = () => state;
// 根据action调用reducer返回新的state并触发listener
const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
/* 这里的subscribe有两个功能
 * 调用 subscribe(listener) 会使用listeners.push(listener)注册一个listener
 * 而调用 subscribe 的返回函数则会注销掉listener
 */
const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

return { getState, dispatch, subscribe };
};	 
```			 	
