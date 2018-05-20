### webpack配置代码分片
### 开发模式---webpack.config.dev
### 一、output增加配置
```javascript
 output: {
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // 每一个分片都产生一个文件,并且定义了文件名
    filename: 'static/js/bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'static/js/[name].chunk.js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath: publicPath,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
```
### 二、plugins配置
```javascript
    plugins:    [
 new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
 new webpack.optimize.CommonsChunkPlugin({name:'common', filename:'static/js/common.[chunkhash:8].js'})
  ],
```    
### 生产模式---webpack.config.prod.js
### 一、配置插件
```javascript
    plugins:    [
 new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
 new webpack.optimize.CommonsChunkPlugin({name:'common', filename:'static/js/common.[chunkhash:8].js'})
  ],
```
### 修改页面动态加载分片
+ 虽然我们已经给webpack配置了代码的分片,但是webpack没有页面的概念
+ 我们的webpack值配置了一个入口文件,所以我们要实现代码分片,关键在于 webpack 会对 require.ensure 函数调用做特殊处理，而且 React-Router 通过 getComponent 函数支持异步加载组件。 
+ webpack遇到 require.ensure就知道要动态的加载文件,所以要使用reactRouter动态的创建组件,详情见代码中注释
### 访问Home的结果
+ common.js --------------公共模块
+ bundle.js----------------入口文件,必须,有启动代码必要的部分
+ home.chunk.js-----------home组件

### 代码的分片所带来的严重问题是
+ 每一个文件的reducer都都属于一个文件,但是reducer文件之间的数据交互成为了一个难题,以后有时间再去深究

+ 在一般的应用中,比较实际一点的做法是对每一个html页面作为一个单页应用,这样就避免了代码分片所带来的复杂性,也比较符合实际,在PC端完全不存在首页卡顿问题,这种方式是个人认为最好的实践方式,但是页面之间的跳转容易引发白屏问题,日后将详解解决方案（多页之间的路由跳转）
```javascript
var globby = require('globby');
var globby = require('globby');
var files = globby.sync(['**/pages/*'], { cwd: cwd + '/src' });
var entry = {
  // vendor: []
};
files.forEach((item) => {
  entry[item + '/index'] = ['./src/' + item + '/index.js'];
});
var config = {
  context: cwd,
  entry,
  output: {
    path: 'web/build',
    publicPath: 'web/build',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  ......
  ......
  }
```