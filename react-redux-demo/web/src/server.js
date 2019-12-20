// import path from 'path'
// import webpack from 'webpack'
// import express from 'express'
// import appConfig from '../config/appConfig'

var path = require('path')
var webpack = require('webpack')
var express = require('express')
var appConfig = require('../config/appConfig')

const app = express()

//webpack中间件配置，包括hotReplace
if(!appConfig.isProduction){
  const wpConfig = require('../config/webpack.dev.js');
  const compiler = webpack(wpConfig)

  const webpackMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware =require('webpack-hot-middleware');

  app.use(webpackMiddleware(compiler,{
    publicPath:wpConfig.output.publicPath,
    noInfo:true,
    stats:{colors:true}
  }))
  app.use(webpackHotMiddleware(compiler))
}

//静态文件服务
app.use(express.static(path.join(__dirname,'../public')))

app.use('*',(req,res) =>{
  res.sendFile(path.join(__dirname,'../public/index.html'))
})

if (appConfig.port){
  app.listen(appConfig.port,appConfig.host,(err) =>{
    if (err){
      console.log(err)
    }else{
      console.info('server is running at %d',appConfig.port)
    }
  })
}else{
  console.error('No port is set')
}
