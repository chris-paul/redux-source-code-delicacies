import React, { Component } from 'react'
/*extends js的原生继承,Component里面有很多react的生命周期的方法可以继承,JSX
最终会被转化为react表达式，依赖React,所以必须引入
*/
class ClickCounter extends Component {
	constructor(props) {
	  	super(props);
		this.onClickButton = this.onClickButton.bind(this)
	  	this.state = {
	  		count:0
	  	};
	}
	onClickButton(){
		this.setState({
			count:this.state.count +1
		})
	}
  render() {
  	const clickCounterStyle = {
  		margin:'16px'
  	}
    return (
    	<div style = {clickCounterStyle}>
    		<button onClick={this.onClickButton}>clikc me </button>
    		click count {this.state.count}
    	</div>
    );
  }
}

export default ClickCounter;
