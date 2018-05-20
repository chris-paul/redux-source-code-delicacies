### Redux中间件
+ 之前我们已经分析了redux-thunk经典的11行代码,现在我们可以了解中间件的相关规则,并且自己编写自己的中间件,一个什么也不做的中间件符合以下格式
```javascript
function doNothingMiddleware{{dispatch, getState)) 
{ 
  return function {next) { 
    return function {action) { 
      return next{action);
    }
  }
} 
//或者
({dispatch, getState})=>next=>action=>next(action)
```
### 中间件的使用
+ 1、 applyMiddleware (thunkMiddleware)产生一个Store Enhancer,configureStore 是一个加强版的createStore 
```javascript
import {createStore, applyMiddleware} from ’ redux’ ;
import thunkMiddleware from ’ redux-thunk’ ;
const configureStore = applyMiddleware (thunkMiddleware) (createStore);
const store= configureStore (reducer, initialState) ; 
```
+ 或者利用createStore的第三个参数,这样使用

```javascript
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import thunkMiddleware from 'redux-thunk'

import {reducer as weatherReducer} from './weather/';

const reducer = combineReducers({
  weather: weatherReducer
});

const middlewares = [thunkMiddleware];

const storeEnhancers = compose(
  applyMiddleware(...middlewares)
);

export default createStore(reducer, {}, storeEnhancers);
```
### promise中间件的实现,解决React异步问题
+ 之前的thunk是把异步请求在中间件中进行发送,然后dispatch一个纯对象,现在我们也可以把发送放到外部实现,解决异步问题很简单,就是在调用成功之后dispatch一下去render界面

**需要申明的一点是,看起来放到了外面,其实都是在中间件里面发的请求**

#### 这个天气的小案例就是使用promise中间件的,里面进行了注释
