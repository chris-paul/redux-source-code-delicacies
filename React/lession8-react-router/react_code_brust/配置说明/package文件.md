### package.json注释
```javascript
{
  "name": "react_code_brust",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "autoprefixer": "7.1.6",   //为了兼容浏览器加css前缀的插件
    "babel-core": "6.26.0",    //babelES6->es5核心
    "babel-eslint": "7.2.3",   //检测代码的规范
    "babel-jest": "20.0.3",    //兼容react的单元测试 jest 
    "babel-loader": "7.1.2",   //babel loaders功能支持
    "babel-preset-react-app": "^3.1.0",
    "babel-runtime": "6.26.0",//babel转换的一些工具方法防止多次引用
    "case-sensitive-paths-webpack-plugin": "2.1.1",  //兼容引入插件时的路径问题
    "chalk": "1.1.3",//输出可以有颜色
    "css-loader": "0.28.7",//加载css 将css装载到JavaScript例如 import './index.css'
    "dotenv": "4.0.0",//env 处理
    "eslint": "4.10.0",//代码检测到
    "eslint-config-react-app": "^2.0.1",
    "eslint-loader": "1.9.0",
    "eslint-plugin-flowtype": "2.39.1",
    "eslint-plugin-import": "2.8.0",
    "eslint-plugin-jsx-a11y": "5.1.1",
    "eslint-plugin-react": "7.4.0",
    "extract-text-webpack-plugin": "3.0.2",//css的打包插件
    "file-loader": "1.1.5",//文件加载打包插件包括图片，js文件等
    "fs-extra": "3.0.1",//文件系统扩展模块
    "html-webpack-plugin": "2.29.0",//html生成插件，可以自动引入css和js
    "jest": "20.0.4",//react单元测试
    "object-assign": "4.1.1",//Object.assign()的兼容库
    "postcss-flexbugs-fixes": "3.2.0",//一种用于修复flexbug的bug的插件
    "postcss-loader": "2.0.8",//css构建中，浏览器兼容库
    "promise": "8.0.1",//promise库
    "raf": "3.4.0",
    "react": "^16.2.0",
    "react-dev-utils": "^4.2.1",
    "react-dom": "^16.2.0",
    "style-loader": "0.19.0",//样式加载库，使JavaScript认识css
    "sw-precache-webpack-plugin": "0.11.4",//跟前端缓存有关的库
    "url-loader": "0.6.2",//css和dom属性中 的各种文件引入
    "webpack": "3.8.1",
    "webpack-dev-server": "2.9.4",
    "webpack-manifest-plugin": "1.3.2",
    "whatwg-fetch": "2.0.3"//fetch 请求，一种更加优雅异步加载的请求方式
  },
  "scripts": {
    "start": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js --env=jsdom"
  },
  "jest": {
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,mjs}"
    ],
    "setupFiles": [
      "<rootDir>/config/polyfills.js"
    ],
    "testMatch": [
      "<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}",
      "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}"
    ],
    "testEnvironment": "node",
    "testURL": "http://localhost",
    "transform": {
      "^.+\\.(js|jsx|mjs)$": "<rootDir>/node_modules/babel-jest",
      "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
      "^(?!.*\\.(js|jsx|mjs|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
    },
    "transformIgnorePatterns": [
      "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"
    ],
    "moduleNameMapper": {
      "^react-native$": "react-native-web"
    },
    "moduleFileExtensions": [
      "web.js",
      "mjs",
      "js",
      "json",
      "web.jsx",
      "jsx",
      "node"
    ]
  },
  "babel": {
    "presets": [
      "react-app"
    ]
  },
  "eslintConfig": {
    "extends": "react-app"
  }
}
```