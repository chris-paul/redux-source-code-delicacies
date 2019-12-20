#ebs_pc
爱用 iyyaf框架，依赖[OpenSSL 1.0.2u](<http://www.openssl.org>)，[Tengine  2.1](<http://www.tegnine.org>)，[Php 7.0](<http://www.php.net>)。

使用Yaf框架，配合API Gateway，适用于docker。


- Yaf
  - PDO DB支持
  	- 支持按需利用，无需读取数据库不连接
	- 支持MySQL Connection连接复用
	- 默认UTF-8支持
	- 默认短连接，可修改为长连接，PdoMySqlAdapter PDO::ATTR_PERSISTENT => true
  - 日志支持 controller
  	- $this->loginfo
	- $this->logdebug
	- $this->logerror
  - JSON/JSONP 支持 controller
  	- $this->setJsonResponse($data);
	- $this->setJsonpResponse($data)
  - TODO Redis 支持
  - TODO cli/task支持
  - TODO ControllerBase基础类
  - TODO Session 支持
- Tengine
  - 支持 HTTP 2.0聚合
  - 支持 reuse 在SLB测试性能惊人
