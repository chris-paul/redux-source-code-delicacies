### React路由
React适合开发单页Web应用,单页应用离不开路由的跳转,所以React-router就是为了实现路由的跳转

### react-router
react-router主要包括Router, Route, IndexRoute,browserHistory,Link
+ Router下可以包含多个route的实例,
+ Router /先被匹配,所以渲染APP组件,接下来所有的子Router组件,都作为App的子组件传入
+ Link主要用来生成导航,Link把路径名传递给Router组件,渲染出响应的界面
+ browserHistory主要记录url的信息,同时作为历史信息处理
```javascript
<Router history={history} createElement={createElement}>
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="home" component={Home} />
    <Route path="about" component={About} />
    <Route path="*" component={NotFound} />
  </Route>
</Router>
```
### React-Router和redux的结合
+ Provider和Router组件都必须位于最上层,但是Provider必须位于Router上面,因为为了不同组件之间的开发,Router的值也保存在了store当中,所以Provider必须处于最上面
```javascript
ReactDOM.render(
<Provider store=(store) >
    <Routes />
</Provider> ,
document.getElementByld ( ’ root’)
)
```
+ 第二种方式利用createElement属性,每一个Router的子组件都都会产生一个Provider,造成了数据的冗余,一般用第一种
```javascript
const createElement = (Component, props) => {
  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
};

<Router history={history} createElement={createElement}>
</Router>
```
### react-router-redux
+ 到现在我们所有的信息都在浏览器的url之中,但是store中却没有路由信息,所以为了开发的方便,不可避免要存URL到store之中,虽然对数据唯一性造成了一定的影响,但是不可必选
+ react-router-redux ,主要定义了routerReducer和syncHistoryWithStore,routerReducer主要用来改变store的数据
+ 同一份数据存储了两份,保持数据的一致性十分重要,syncHistoryWithStore就是用来保持数据的一致性,当一个数据改变之后去更新另外一个数据
```javascript
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
const store = createStoreWithMdware(reducers);
const history = syncHistoryWithStore(hashHistory, store);
ReactDom.render(
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>,
	document.getElementById('container')
);
```
