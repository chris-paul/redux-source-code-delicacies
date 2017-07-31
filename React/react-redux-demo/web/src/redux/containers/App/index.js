/**
*APP组件，整个应用顶级路由

这是整个APP的顶层路由页面，所有的路由都会加载这个页面组件，然后根据路由来匹配this.props.children子页面路由


**/

import React,{Component, PropTypes} from 'react'
import Myitem from './components/Myitem'

import Navigation,{Item, Group} from 'qnui/lib/navigation';
import Icon from 'qnui/lib/icon';
import Menu from 'qnui/lib/menu';
import './app.css'




/**
<li> <IndexLink to="/dist/" activeStyle={{color:'red'}}>Home</IndexLink> </li>-->

**/
var App = React.createClass({
    getInitialState(){
        return {
            // nav_active : "navigation_min"
            nav_active : "navigation_max"
        }
    },
    handleChange(e){//鼠标移入移出
        //this.setState({nav_active:e});

    },
    handleShow(c){
        return c == 'navigation_min'?(''):(
            <span style={{"marginLeft":"3px"}}>电商套件</span>
        );
    },
    componentDidMount(){
        //setTimeout(()=>{this.setState({nav_active:'navigation_min'});},500);
    },

    render(){
        var active = this.state.nav_active;
        let header = this.handleShow(active);
        return(
            <div id="container">

                <div id="navigation"  className={active} >
                    <Navigation
                         style={{backgroundColor:"white",border:"0px"}}
                         type="tree"
                         activeDirection="right">
                        <li className="qn-navigation-vertical">
                               <img style={{width: "24px", verticalAlign: "middle"}} src="image/ebs_log.png"/>
                               {header}
                        </li>
                     </Navigation>
                     <Navigation
                         style={{height:"calc(100% - 52px)",backgroundColor:"white",border:"0px",overflowY: "auto"}}
                         type="tree"
                         activeDirection="right">
                        <Myitem kind = {active} itemId="Trade" icon="form" link="/dist" text="订单管理">
                            <Navigation>
                                <Myitem
                                      itemId="Trade"
                                      kind = {active}
                                      link="/dist/inventory"
                                      text="库存管理"
                                />
                                <Myitem
                                      itemId="Trade"
                                      kind = {active}
                                      link="/dist/demo"
                                      text="Demo"
                                />
                            </Navigation>
                        </Myitem>
                        <Myitem
                            itemId="Search"
                            kind = {active}
                            icon="search"
                            link="/dist/search"
                            text="订单查询"
                        />
                    </Navigation>
                </div>
                <div id="module_data" >
                    <div id="initSet" >
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
})
export default App
