#### setState同步场景
+ setTimeout中的setState

```javascript
class App extends Component {
    state = { val: 0 }
    componentDidMount() {
    setTimeout(_ => {
      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val) // 输出更新后的值 --> 1
    }, 0)
 }
  render() {
    return (
      <div>
        {`Counter is: ${this.state.val}`}
      </div>
    )
  }
}
```

+ setTimeOut批量更新只更新最后一个setState的值

```javascript
class App extends Component {
  state = { val: 0 }
  batchUpdates = () => {
    this.setState({ val: this.state.val + 1 })
    this.setState({ val: this.state.val + 1 })
    this.setState({ val: this.state.val + 1 })
 }
  render() {
    return (
      <div onClick={this.batchUpdates}>
        {`Counter is ${this.state.val}`} // 1
      </div>
    )
  }

}
```

#### setState异步场景

+ 合成事件中的setState

```javascript
class App extends Component {
  state = { val: 0 }
  increment = () => {
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val) // 输出的是更新前的val --> 0
  }
  render() {
    return (
      <div onClick={this.increment}>
        {`Counter is: ${this.state.val}`}
      </div>
    )
  }
}
```

+ 生命周期中的setState

```javascript
class App extends Component {
  state = { val: 0 }
  changeValue = () => {
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val) // 输出的是更新后的值 --> 1
  }
 componentDidMount() {
    document.body.addEventListener('click', this.changeValue, false)
 }
  render() {
    return (
    <div>

        {`Counter is: ${this.state.val}`}
      </div>
    )
  }

}
```

+ 参考文献

    + https://mp.weixin.qq.com/s?__biz=MzA5NzkwNDk3MQ==&mid=2650587669&idx=1&sn=dcab49d69f597bcccdb6a879cdb13185&chksm=8891d231bfe65b27a90f94ab5d1622e624f7ef5567a5a0dbeee0201c8f930a5f6296c2af7fbd&mpshare=1&scene=23&srcid=07150fFtISSBDaufcQbxxhlq#rd