### 安装flux
		npm install --save flux
		
### Flux优势

+ View可以从model中获取数据,但是view想去改变model必须发出一个action,避免了数据的混乱,

+ 相比于react通过props去不断的进行数据交互,并且经常需要对一个值存储在两个不同的组件中,Flux将所有的值存储在store中

+  数据都在store中,react只是view,state已经成为了store的数据的映射

#### flux的不足

+ Flux的目的是减少组件的之间的数据的依赖,但是很多组件需要使用waitFor函数等其它组件执行完成之后才能去执行,其实组件的依赖性还是存在的。主要原因是多个store所造成的

+ Flux并不能在服务器端进行

+ 随着项目的复杂,dispatch触发的很多事件根本就不知道他的执行顺序,处理这些执行顺序消耗了
太多精力,也增加了项目的耦合性,造成这种问题的根源是多个store	