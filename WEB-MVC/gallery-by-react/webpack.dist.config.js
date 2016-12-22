/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var webpack = require('webpack');

module.exports = {

  output: {
    //最终部署到服务器的路径，  devServer: {
      //contentBase: "./public",//本地服务器所加载的页面所在的目录
    publicPath: '/assets/',
    path: 'dist/assets/',
    filename: 'main.js'
  },

  debug: false,
  devtool: false,
  //入口
  entry: './src/components/GalleryByReactApp.js',

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),//检测文件中相似的，消除冗余
    new webpack.optimize.UglifyJsPlugin(),//压缩
    new webpack.optimize.OccurenceOrderPlugin(),//按照引用频度排序
    new webpack.optimize.AggressiveMergingPlugin(),//优化代码段
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'styles': __dirname + '/src/styles',
      'mixins': __dirname + '/src/mixins',
      'components': __dirname + '/src/components/'
    }
  },

  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }],
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },{
        test: /\.json/,
        loader:'json-loader'
    },{
      test: /\.css$/,
      loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version"]}'
    }, {
      test: /\.scss/,
      loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version"]}!sass-loader?outputStyle=expanded'
    }, {
      test: /\.(png|jpg|woff|woff2)$/,
      loader: 'url-loader?limit=8192'
    }]
  }
};
