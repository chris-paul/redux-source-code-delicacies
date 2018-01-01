### 单元测试JEST
Facebook自己为react提供了单元测试框架Jest,他会找到当前项目下的.test.js结尾的文件或者_test_目录下的文件作为单元测试代码
+ Mocha + Chai进行单元测试
+ Jest进行单元测试(自带了断言库)

        npm install jest enzyme babel-jest --save-dev
### 断言
+ 就是判断源码的实际执行结果与预期结果是否一致，如果不一致就抛出一个错误
所有的测试用例都有断言.比如Chai著名的expect断言
```javascript
it (’ should return object when invoked’,()=>{ 
//断言
}); 
```
### 套件
+ 所谓的套件就相当于测试用例组,他由多个测试用例和套件组成,也就是说一个describ函数包含多个it函数
```javascript
describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    //断言
  });
  beforeAll,在开始测试套件开始之前执行一次
  afterAll,在结束测试套件中所有测试用例之后执行一次
  beforeEach,每个测试用例在执行之前都执行一次
  afterEach,每个测试用例在执行之后都执行一次
});
```
### Enzyme
它扩展了React的套件并通过支持类似jQuery的find语法可以很方便的对render出来的结果做各种断言。Enzyme 支持三种渲染方法
+  shallow，其作用是仅仅渲染至虚拟节点，不会返回真实的节点,适合只测试 React 组件的渲染 行为；
+  mount，渲染完整的 React 组件包括子组件，借助模拟的浏览器环境完成事件处 理功能； 
+  render，渲染完整的 React 组件，但是只产生 HTML，并不进行事件处理。
```javascript
describe ( 'filters ',() =>{ 
    it ('should render three link ', ()=>{ 
        const wrapper= shallow(<Filters />); 
        expect(wrapper.contains(<Link filter= { FilterTypes. ALL)> {Fil terTypes . ALL) </Link>)) .toBe(true); 
        expect(wrapper.contains{<Link filter={FilterTypes. COMPLETED)> {FilterTypes. COMPLETED) </Link>)) .toBe(true) ; 
        expect(wrapper.contains{<Link filter={FilterTypes.UNCOMPLETED)> {FilterTypes. UNCOMPLETED) </Link>)) .toBe(true) ; 
    })
})  
```
###  sinon
sinon可以模拟网络请求,有些action对象依赖于对网络API的请求,所以需要使用sinon,在一个单元测试中去发送一个网络请求是是不应该出现的,测试环境应该尽可能的干净,sinon主要提供了三种测试方式
+ spy的作用在于可以监视一个函数被调用的情况。spy相当于给我们感兴趣的函数加了一层wrapper，于是记录下了这个函数被调用过几次，每次传入的参数是什么以及每次返回的结果是什么，或是抛出了怎样的异常。
```javascript
var sinon = require("sinon");

...

sinon.spy(crawler, "launch"); // 监视crawler.launch，这是个function

... // 对crawler.launch进行调用

crawler.launch.callCount > 1; // 该函数的调用次数
crawler.launch.withArgs("...").calledOnce; // 该函数是否以...参数调用过一次

crawler.launch.restore(); // 消除监视
```
+ 测试中有可能遇到这样的情形：测试函数f1，f1依赖于函数f2，我们需要测试f1在f2的不同表现之下有怎样的表现。但是让f2有不同的表现可能会很不容易，有可能需要复杂的配置或是精巧的捏造，或是f2出现某种表现的几率很小等等。这时stub就可派上用场，stub就是人为设定的f2的替代品。我们可以设定stub在怎样的输入下有怎样特定的表现，从而不再阻碍对f1的测试。
**最简单的例子,你不能让接口随意返回你任何数据,**
```javascript
var sinon = require("sinon");

var stub = sinon.stub(); // 创建一个stub
var stub = sinon.stub(ab, "f"); // 将ab.f替换成一个stub，使用完毕后需要调用stub.restore()或ab.f.restore()来复原
var stub = sinon.stub(ab, "f"， function(...) {...}); // 将ab.f替换成指定的函数

stub.returns(10);
stub(); // stub()总是返回10

stub.throws("...");
stub(); // stub()总是抛出"..."

stub.withArgs(1).returns(10);
stub(1); // stub(1)会返回10

stub.restore();
```
+ mock在Sinon.js中用于对一个object的活动进行监视
```javascript
var sinon = require("sinon");

var obj = {
  ...
};

var mock = sinon.mock(obj);
mock.expect("f").atLeast(2).withArgs(10); // obj.f(10)调用至少出现过2次

...

mock.verify(); // 测试此时的obj是否满足上面的mock设定条件
mock.restore();
```
###  redux-mock-store
异步action的时候,检测action是否派发(因为我们并不需要真正的派发到reducer中), 这个库主要是产生一个模拟的redux-store,但是并没有真正的dispatch,例子在weather/test
####  React的测试主要分为以下几个方面
+ 组件测试查看组件是否渲染
+ reducer测试
+ 异步action测试
