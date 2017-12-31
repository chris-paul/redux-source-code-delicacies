### React请求服务器数据

+ 因为请求是异步的,不可避免的需要需要render两次,请求一般在componentDidMount,之所以不在componentWillMount是因为在同构的情况下，生命周期会走到componentWillMount，这样使用ajax就会出错，所以之前一个比较好的解决方案是将ajax放在组件挂载的页面上时再去拉取数据，还有就是，考虑用户体验，假如放在componentWillMount中，那么没有数据过来时就是白屏，而放在componentDidMount中可以有一个初始的状态

### fetch API发送请求返回promise对象,需要注意的有两点
+ 当执行then的时候可能只是拿到了HTTP报文头,第二次执行then返回了数据
+ fetxh API让人诟病的一点是,他认为只要服务器返回了一个合法的响应,j就认为请求成功了,即使HTTP状态码是400或500,这也是他和ajax的区别之处。
### 通过代理解决跨域
"proxy": "http://www.weather.com.cn/",
//通过设置代理,如果发送的请求不是本地请求,就将域名改为这个发送出去,解决跨域