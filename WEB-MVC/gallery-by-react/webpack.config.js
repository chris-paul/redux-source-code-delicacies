/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');
//webpack 生产环境产生的代码的时候生成的东西存储在内存中，而不是存储在磁盘上
module.exports = {
//出口，
  output: {
    filename: 'main.js',
    publicPath: '/assets/'
  },

  cache: true,
  debug: true,
  devtool: 'sourcemap', //方便浏览器的devtools调试
  //入口
  entry: [
    //热更新还要设置hot为true并且引入脚本才能自动刷新浏览器
      'webpack/hot/only-dev-server',
      './src/components/GalleryByReactApp.js'
  ],

  stats: {
    colors: true,
    reasons: true
  },
//模块解析配置项
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'styles': __dirname + '/src/styles',
      'mixins': __dirname + '/src/mixins',
      'components': __dirname + '/src/components/'
    }
  },
//css-loader 是处理css文件中的url()等
// style-loader 将css插入到页面的style标签顺便告诉你
// less-loader 是将less文件编译成css
// sass-loader 是将sass文件编译成css
//我们之所以可以require引入 是因为loaders
  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }],
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel-loader' //实时编译react的loader
    },{
        test: /\.json/,
        loader:'json-loader'
    },{
      test: /\.scss/,
      //sass的输出格式是expande
      loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version"]}!sass-loader?outputStyle=expanded'//感叹号是从右往左加载,indentedSyntax允许sass类ruby的写法
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version"]}'
    }, {
      test: /\.(png|jpg|woff|woff2)$/,
      loader: 'url-loader?limit=8192' //当文件大小小于8k,直接返回base64的文件
    }]
  },

  plugins: [
    //热更新插件
    new webpack.HotModuleReplacementPlugin()
  ]

};
