### 项目构建

      npm install -g create-react-app
      create-react-app raect_todolist

### 配置sass的开发环境

      $ npm install sass-loader node-sass --save-dev
      npm run eject  //将react-script的依赖一个个拆分，将配置文件抽象出来

### run eject生成config文件,配置webpack,在webpack.confif.dev.js添加如下代码

       {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.scss$/,
          /\.json$/,
          /\.svg$/
        ],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test:/\.scss$/,
        include:paths.appSrc,
        loaders:['style','css','sass']
      }

+ node-sass可能会安装失败

        //使用淘宝镜像完成安装
        1 npm install -g cnpm --registry=https://registry.npm.taobao.org
        2 cnpm install node-sass

### 组件的拆分      
  
  + App ----------------应用组件
  + TodoHeader ---------头部组件
  + TodoMain -----------主体组件
  + TodoItem -----------todo项组件
  + TodoFooter ---------尾部组件

### 实现

  + 动态显示初始化todos列表数据

  + 添加新的todo,显示在列表的首位

  + 勾选指定的todo

  + 删除指定的todo

  + 显示完成的/所有的todo的数量

  + 全选和全不选

  + 删除所有选中的

  ### 项目的打包和运行

      npm run build
      //根据提示
      npm install -g pushstate-server
      pushstate-server build
      start http://localhost:9000
      //但是运行没有样式，就是build的文件没有解析每个模块的scss
      npm install create-react-app-sass --sacve-dev   //将每一个模块的sass解析为css
      //修改package.json
      "scripts":{
        "start":"react-scripts-with-sass start",
        "build":"react-scripts-with-sass build",
        "test":"react-scripts test --env=jsdom",
        "eject":"react-scripts eject"
      }


