### path这个文件主要是返回一些主要文件的路径

```javascript
//返回项目的根目录
const appDirectory = fs.realpathSync(process.cwd());
//返回某一个文件的绝对路径
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
//返回静态文件的存放目录,一般为空
const envPublicUrl = process.env.PUBLIC_URL;
//如果public文件为空,就可以读取package.json的homepage属性对应根目录
const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;
//获取项目运行的目录，运行的目录并不是根目录下
function getServedPath(appPackageJson) {
//获取根路径,如果根路径为空就返回/
  const publicUrl = getPublicUrl(appPackageJson);
//url.parse解析路径,http:3000/one，pathname返回根路径/one
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}
//第一个参数是路径,第二个参数是否需要路径最后的/
function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}

```