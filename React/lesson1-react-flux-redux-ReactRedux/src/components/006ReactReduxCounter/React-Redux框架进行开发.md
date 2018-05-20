### 加载依赖

cnpm install react-redux --save

### 这个框架把我们之前很多繁琐的事情进行了封装

+ connect用来创建一个容器,并且与傻瓜子组件进行数据交互

	export default connect(mapStateToProps, mapDispatchToProps) ( Counter); 

+ 把store上的状态作为props传入子组件
+ 把内层傻瓜组件的动作派发给store
+ provider类似与上一节中的provider,主要提供全局的store,并且对store的要求更加严格

### 注意代码中的示例	
