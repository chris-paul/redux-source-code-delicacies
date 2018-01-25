### React封装公共方法
+ 典型的例子是：当很多界面需要一个弹窗的时候,如果把这个组件 写在内容页会引起不必要的渲染（当然你也可以使用生命周期去优化）,所以封装公共方法 是最好的是实践方式
+ api.js是公共方法的接口,index.js是组件
```javascript
use strict';

import React from 'react';
import ReactDom from 'react-dom';
import TestDialog from './index';
/**
 * [封装简单的弹窗方法]
 * @author lhk
 */
export default function showTestDialog({dataSource, callback}){
    let func = ()=>{
        let element = document.getElementById("showTestDialog");
        if(element) element.parentNode.removeChild(element);
    }

    let div = document.createElement('div');
    div.id = "showTestDialog";
    document.getElementById('container').appendChild(div);

    ReactDom.render(
      <showTestDialog dataSource = {dataSource} callback = {callback} onClose = {func}/>,
      document.getElementById('showTestDialog')
    );
}
```
### 注意
当你需要取消这个组件或者弹窗的时候,记得调用this.props.onClose,删除这个组件的外部容器
### 不足
再好的东西也有不足,公共的方法是不无法引入actions的,必须以传参的方式传入