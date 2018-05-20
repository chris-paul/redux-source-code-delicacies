### reset reducer和action

+ 如果我们从一个页面到了另外一个页面,我们需要重置reducer和state,但是因为页面并没有渲染,我们希望
维持一个store

```javascript
const RESET_ACTION_TYPE = '@RESET';

const resetReducerCreater = (reducer.resetState) =>(state,action)=>{
	if(action.type == RESET_ACTION_TYPE){
		return resetState;
	}else{
		return reducer(state,action);
	}
}

const reset = (createStore) =>(reducer,preloadedState,enhancer)=>{
	const store = createStore(reducer,preloadedState,enhancer);
	const reset = (resetReducer,resetState) =>{
		const newReducer = resetReducerCreater(resetReducer,resetState);
		store.replaceReducer(newReducer);
		store.dispatch({tyep:RESET_ACTION_TYPE,state:resetState});
	}
	return {
		...store,
		reset
	}
}
export default reset;
```