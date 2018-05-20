### 这个文件的主要目的是
首先明确env.js的主要目的在于读取env配置文件并将env的配置信息给到全局变量process.env
### require和cache
+ require方法可以去加载一个文件,此时你可以在项目中进入node环境.reuqire("./config/paths.js")查看加载的文件所返回的内容
```javascript
{ dotenv: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\react_cod
e_brust\\.env',
  appBuild: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\react_c
ode_brust\\build',
  appPublic: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\react_
code_brust\\public',
  appHtml: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\react_co
de_brust\\public\\index.html',
  appIndexJs: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\react
_code_brust\\src\\index.js',
  appPackageJson: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\r
eact_code_brust\\package.json',
  appSrc: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\react_cod
e_brust\\src',
  yarnLockFile: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\rea
ct_code_brust\\yarn.lock',
  testsSetup: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\react
_code_brust\\src\\setupTests.js',
  appNodeModules: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\r
eact_code_brust\\node_modules',
  publicUrl: undefined,
  servedPath: '/' }
```
+ 此时的require.cache是键值对的方式对加载的数据进行缓存
```javascript
{ 'F:\practice\react\WEB-MVC\React\lession8-react-router\react_code_brust\config
\paths.js':
   Module {
     id: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\react_code
_brust\\config\\paths.js',
     exports:
      { dotenv: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\rea
ct_code_brust\\.env',
        appBuild: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\r
eact_code_brust\\build',
        appPublic: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\
react_code_brust\\public',
        appHtml: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\re
act_code_brust\\public\\index.html',
        appIndexJs: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\
\react_code_brust\\src\\index.js',
        appPackageJson: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-rou
ter\\react_code_brust\\package.json',
        appSrc: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\rea
ct_code_brust\\src',
        yarnLockFile: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-route
r\\react_code_brust\\yarn.lock',
        testsSetup: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\
\react_code_brust\\src\\setupTests.js',
        appNodeModules: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-rou
ter\\react_code_brust\\node_modules',
        publicUrl: undefined,
        servedPath: '/' },
     parent:
      Module {
        id: '<repl>',
        exports: {},
        parent: undefined,
        filename: null,
        loaded: false,
        children: [Array],
        paths: [Array] },
     filename: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\reac
t_code_brust\\config\\paths.js',
     loaded: true,
     children: [ [Object] ],
     paths:
      [ 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\react_code_
brust\\config\\node_modules',
        'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\react_code_
brust\\node_modules',
        'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\node_module
s',
        'F:\\practice\\react\\WEB-MVC\\React\\node_modules',
        'F:\\practice\\react\\WEB-MVC\\node_modules',
        'F:\\practice\\react\\node_modules',
        'F:\\practice\\node_modules',
        'F:\\node_modules' ] },
  'F:\practice\react\WEB-MVC\React\lession8-react-router\react_code_brust\packag
e.json':
   Module {
     id: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\react_code
_brust\\package.json',
     exports:
      { name: 'react_code_brust',
        version: '0.1.0',
        private: true,
        dependencies: [Object],
        scripts: [Object],
        jest: [Object],
        babel: [Object],
        eslintConfig: [Object] },
     parent:
      Module {
        id: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\react_c
ode_brust\\config\\paths.js',
        exports: [Object],
        parent: [Object],
        filename: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\r
eact_code_brust\\config\\paths.js',
        loaded: true,
        children: [Array],
        paths: [Array] },
     filename: 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\reac
t_code_brust\\package.json',
     loaded: true,
     children: [],
     paths:
      [ 'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\react_code_
brust\\node_modules',
        'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\node_module
s',
        'F:\\practice\\react\\WEB-MVC\\React\\node_modules',
        'F:\\practice\\react\\WEB-MVC\\node_modules',
        'F:\\practice\\react\\node_modules',
        'F:\\practice\\node_modules',
        'F:\\node_modules' ] } }

```
+ 获取文件的绝对路径
```javascript
    require.resolve('./testModule.js')
```
+ 当使用delete关键字删除缓存区中缓存的某个模块对象后，下次加载该模块时将重新运行该模块中的代码
```javascript
delete require.cache[require.resolve('./paths')];   
```
### NODE_ENV
+ process.env.NODE_ENV获取环境变量,有两种情况,development(默认开发环境),production,和test
### 读取不同环境的配置文件
+ dotenvFiles,读取本地的env文件,并且去除空文件,其实是有优先级排序的注意
```javascript
var dotenvFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `${paths.dotenv}.local`,
  paths.dotenv,
].filter(Boolean);
//那么我们的这些配置文件的优先级，优先级由大到小
npm start:.env.development.local ,.env.development,.evn.local,.env

npm run build:.env.production.local,.env.productor,.env.local,.env

npm test :.env.test.local,.env.test .env
```
### dotenv 的使用
+ dotenv 库帮助我们将.env文件的变量加载到我们的环境中的应用的 ENV 中。
```javascript
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
  //如果这个文件存在的话,就指定这个文件的自定义路径,并加入环境变量
    require('dotenv').config({
      path: dotenvFile,
    });
  }
});
```
###
```javascript
//process.cwd()获取当前执行node命令的目录,在这个项目中文件的路径是,'F:\\practice\\react\\WEB-MVC\\React\\lession8-react-router\\react_code_brust'
//path.delimiter 方法将返回平台的默认分隔符(以环境变量为例,window返回;linux返回：),
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
    //返回环境变量的数组
  .split(path.delimiter)
  //筛除数组中的绝对路径
  .filter(folder => folder && !path.isAbsolute(folder))
  //将相对路径变为绝对路径
  .map(folder => path.resolve(appDirectory, folder))
  //返回:分隔的字符串
  .join(path.delimiter);
```
### 返回系统的所有的配置
const REACT_APP = /^REACT_APP_/i;
```javascript
function getClientEnvironment(publicUrl) {
//获取系统所有的环境变量,并将对象转化为对象属性数组
  const raw = Object.keys(process.env)
     //将不是REACT_APP开头的文件去掉
    .filter(key => REACT_APP.test(key))
    //将静态文件的路径,和node环境变量,再加上我们前面文件自定义的变量全部筛选出来组成一个新的对象
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: process.env.NODE_ENV || 'development',
        // Useful for resolving the correct path to static assets in `public`.
        // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
        // This should only be used as an escape hatch. Normally you would put
        // images into the `src` and `import` them in code to get their paths.
        PUBLIC_URL: publicUrl,
      }
    );
  // Stringify all values so we can feed into Webpack DefinePlugin
  //将所有的对象的value变为字符串
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}
```