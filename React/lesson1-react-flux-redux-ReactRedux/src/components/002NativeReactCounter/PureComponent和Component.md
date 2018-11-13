### PureComponent和Component的区别和联系

+ PureComponent组件和Component组件几乎一模一样，但是PureComponent组件的shouldComponentUpdate组件不是直接返回true,
而是进行state和props的浅层比较。


```javascript
    class Counter extends Component {
        ...
        shouldComponentUpdate(nextProps, nextState) {
          console.log("enter shouldComponentUpdate")
          return (nextProps.caption !== this.props.caption) ||
                 (nextState.count !== this.state.count);
        }
        ...
    }

    //等同于
    class Counter extends Pu，eComponent {
        ...
        ...
    }
```

### 使用场景, 只适用于纯组件

    + 如果一个组件只和 props 和 state 有关系，给定相同的 props 和 state 就会渲染出相同的结果，那么这个组件就叫做纯组件

    + PureComponent其实就是重写了shouldComponentUpdate方法

    ```javascript
    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) ||
            !shallowEqual(this.state, nextState);
    }
    ```
### 浅比较

+ Object.is用来比较两个值是否相等，它在下面6种情况下，会返回true

    + 两个值都是 undefined

    + 两个值都是 null

    + 两个值都是 true 或者都是 false

    + 两个值指向同一个对象

    + 两个值都是数字并且都是正零 +0，都是负零 -0，都是 NaN，都是除零和 NaN 外的其它同一个数字

+
    ```javascript
    // 用原型链的方法
    const hasOwn = Object.prototype.hasOwnProperty

    // 这个函数实际上是Object.is()的polyfill
    function is(x, y) {
      if (x === y) {
        //处理为+0 != -0的情况
        return x !== 0 || y !== 0 || 1 / x === 1 / y
      } else {
        //处理 NaN === NaN的情况
        return x !== x && y !== y
      }
    }

    export default function shallowEqual(objA, objB) {
      // 首先对基本数据类型的比较
      if (is(objA, objB)) return true
      // 由于Obejct.is()可以对基本数据类型做一个精确的比较， 所以如果不等
      // 只有一种情况是误判的，那就是object,所以在判断两个对象都不是object
      // 之后，就可以返回false了
      if (typeof objA !== 'object' || objA === null ||
          typeof objB !== 'object' || objB === null) {
        return false
      }

      // 过滤掉基本数据类型之后，就是对对象的比较了
      // 首先拿出key值，对key的长度进行对比

      const keysA = Object.keys(objA)
      const keysB = Object.keys(objB)

      // 长度不等直接返回false
      if (keysA.length !== keysB.length) return false
      // key相等的情况下，在去循环比较
      for (let i = 0; i < keysA.length; i++) {
      // key值相等的时候
      // 借用原型链上真正的 hasOwnProperty 方法，判断ObjB里面是否有A的key的key值
      // 属性的顺序不影响结果也就是{name:'daisy', age:'24'} 跟{age:'24'，name:'daisy' }是一样的
      // 最后，对对象的value进行一个基本数据类型的比较，返回结果
        if (!hasOwn.call(objB, keysA[i]) ||
            !is(objA[keysA[i]], objB[keysA[i]])) {
          return false
        }
      }

      return true
    }
    ```

    
