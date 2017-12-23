### 使用reduxd开发完成之后,我们的一个组件既要和store打交道,又要和控制自身的状态,同时还要处理	父组件的值功能有点复杂,不利于代码的复用

### 新的开发模式讲究外层的容器组件去和store打交道,内部组件不维护自身的state,只是根据props
	去做他自己的事

### 当前的瓶颈

	+ 当前的组件直接引用了store,当我们想要作为一个第三方组件的时候,根本就不知道这个唯一的store在那里

### 改进：不在累赘

	+ redux提供了一个context的上下文环境,只要在顶层组件声明他并返回一个函数就可以,但是最顶层根本不知道是什么组件,所以需要我们实现一个provider

	+ provider是一个纯函数，是react帮我们实现的顶层组件

		import {PropTypes, Component} from 'react';

		class Provider extends Component {

		getChildContext() {
		  return {
		    store: this.props.store
		  };
		}

		render() {
		  return this.props.children;
		}
		}

		Provider.propTypes = { store: PropTypes.object.isRequired }
		/*必须的,告诉react provider是一个context的提供者,否则子组件无法找到context*/
		Provider.childContextTypes = { store: PropTypes.object };

		export default Provider;	

	+ index.js

		import store from './Store.js';
  		import Provider from './/Provider.js';
  		ReactDOM .render( 
  			<Provider store={store}> 
  			<ControlPanel />
  			 </Provider>, 
  		document .getElementByid ( 'root'))

  	+ CounterContainer子组件取得context

  		/*必须和Provider.childContextTypes指定的类型一样,否则子组件无法访问到*/
  		CounterContainer.contextTypes = { store: PropTypes. object }

  		constructor (props, context) {     
  			super(props, context); 
		}
		  
		getOwnState() { 
		      return { value: this.context.store.getState () [this. props . caption]
		     };
		 }
	
