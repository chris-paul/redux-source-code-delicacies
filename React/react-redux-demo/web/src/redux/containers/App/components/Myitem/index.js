import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { select,active } from './actions'
import _ from 'lodash';



class Myitem extends Component {
    constructor(props) {
        super(props);
    }
    init(){
        const { kind } = this.props;
        console.log("渲染之前进行初始化之后的属性是");
        console.log(this.props);
        let myItem = kind == 'navigation_min'?this.showItem_max():this.showItem_max();
        return myItem;
    }
    componentDidMount(){
        const {router, itemActive} = this.props;
        console.log("Myitem的属性是");
        console.log(this.props);
        React.Children.map(this.props.children,function(c){
            React.Children.map(c.props.children,function(e){
                if(e.props.link == router.pathname){
                    itemActive(false);
                }
            });
        });
    }
    showItem_min(){
        const { kind, icon, text, link, itemId, router, selectType, activeId, activeType, itemMouseOver, itemActive, itemUnline } = this.props;
        //是否处于激活状态
        let active = selectType ? 'nav_link_active next-navigation-item-content-inner ' : 'nav_link next-navigation-item-content-inner';
        //是否包含2级目录
        let sub_activeType = false;
        React.Children.map(this.props.children,function(c){
            React.Children.map(c.props.children,function(e){
                if(e.props.link == router.pathname){
                    return active ='nav_link_active next-navigation-item-content-inner ';
                }
            });
        });
        let sub_img = "";
        if(icon == "yifu" || icon == "tuikuan" || icon == "cangku"){
            sub_img = _.isEmpty(icon)?"":(<i className={`iconfont icon-${icon} next-icon-medium next-navigation-item-icon next-navigation-item-custom-icon-ay-min`} >
            </i>);
        }else{

            sub_img = _.isEmpty(icon)?"":(<i className={`next-icon next-icon-${icon} next-icon-medium next-navigation-item-icon next-navigation-item-custom-icon-ay-min`} >
            </i>);
        }//isEmpty,lodash库函数

        let copy_actvieType = activeId == itemId ? activeType : false;
        //父级导航栏
        let activeType_div = (<div   className={active} >
            {sub_img}
        </div>)
        return (
            <li className={`next-navigation-item`} >
                <div className="next-navigation-item-content" style={{paddingLeft:"0px",overflow:"hidden"}}>
                        {activeType_div}
                </div>
            </li>
        );
    }
    showItem_max(){
        const { kind, icon, text, link, itemId, router, selectType, activeId, activeType, itemMouseOver, itemActive, itemUnline } = this.props;

        //是否包含2级目录
        let ishavachildren = false;
        let sub_activeType = false;
        React.Children.map(this.props.children,function(c){
            React.Children.map(c.props.children,function(e){
                ishavachildren =true
                if(e.props.link == router.pathname){
                    return sub_activeType =true;
                }
            });
        });

        let icon_css = kind == 'navigation_min' ? 'next-navigation-item-custom-icon-ay-min':'next-navigation-item-custom-icon-ay-max';

        //子目录
        let children = ishavachildren?(<div className="next-navigation-item-children">{this.props.children}</div>):'';
        let sub_img = "";
        if(icon == "yifu" || icon == "tuikuan" || icon == "cangku"){
            sub_img = _.isEmpty(icon)?"":(<i  className={`iconfont icon-${icon} next-icon-medium next-navigation-item-icon ${icon_css}`} >
            </i>);
        }else{

            sub_img = _.isEmpty(icon)?"":(<i className={`next-icon next-icon-${icon} next-icon-medium next-navigation-item-icon ${icon_css}`} >
            </i>);
        }
        {
            /*
            let sub_img = _.isEmpty(icon)?"":(<i className={`next-icon next-icon-${icon} next-icon-medium next-navigation-item-icon next-navigation-item-custom-icon`} >
                {/* <img style={{width: "12px",color:" #3089dc"}} src={`image/${icon}.png`}/>  next-navigation-item-custom-icon-ay *//*}</i>);//isEmpty,lodash库函数
             */
        }

        let text_css = kind == 'navigation_min' ? 'show_min':'show_max';
        let t_text =  text;  //? "• ":text;
        if ( kind == 'navigation_min' ){
            switch (text) {
                case '待审单':
                    t_text = "审";
                break;
                case '异常单':
                    t_text = "异";
                break;
                case '订单打印':
                    t_text = "打";
                break;
                case '扫码验货':
                    t_text = "验";
                break;
                case '订单称重':
                    t_text = "称";
                break;
                case '发货失败':
                    t_text = "发";
                break;
                case '待付款':
                    t_text = "付";
                break;
                case '订单查询':
                    t_text = "查";
                break;
                case '售后列表':
                    t_text = "售";
                break;
                case '退货入库':
                    t_text = "退";
                break;
                case '商品列表':
                    t_text = "商"
                break;
                default:
                    t_text =( <font style={{marginLeft: "5px"}}>•</font> );
            }
        }



        let copy_actvieType = activeId == itemId ? activeType : false;
        //父级导航栏
        let activeType_div = (ishavachildren && copy_actvieType)?(
            <div  onClick={()=>{itemActive(copy_actvieType)}}  className="nav_link_unlink next-navigation-item-content-inner" >
                {sub_img}
                <span className={`${text_css} next-navigation-item-text `}>{t_text}</span>
                <i className={`${text_css} next-icon next-icon-arrow-down next-icon-medium next-navigation-item-icon next-navigation-item-leaf-icon `}></i>
            </div>):(
                <div  onClick={()=>{itemActive(copy_actvieType)}}  className="next-navigation-item-content-inner" >
                    {sub_img}
                    <span className={`${text_css} next-navigation-item-text `}>{t_text}</span>
                    <i className={`${text_css} next-icon next-icon-arrow-down next-icon-medium next-navigation-item-icon next-navigation-item-leaf-icon `}></i>
                </div>);
        //子级导航栏
        let sub_activeType_div = (sub_activeType || selectType)?(
            <div   className="next-navigation-item-content-inner" >
                {sub_img}
                <span className={`${text_css} next-navigation-item-text `}> {t_text}</span>
            </div>):(
                <Link to={link} onClick={itemMouseOver} className="next-navigation-item-content-inner" >
                    {sub_img}
                    <span className={`${text_css} next-navigation-item-text`}> {t_text}</span>
                </Link>);
        //合成导航栏 父+子
        let span_sub_icon=(ishavachildren)=>{
            return ishavachildren?activeType_div:sub_activeType_div;
        };

        /**
        activeId：
            当前nav的活跃状态，true即打开中，false即收起中
        copy_actvieType:
            当前的活跃的目录栏是否是操作的活跃目录，true则正常判定，false则已处于活跃的目录收起
        sub_activeType:
            当前nav是否访问2级子目录，为true即正处于子目录，父级目录需打开，反之则收起
        selectType:
            当前的nav‘link是否和router相匹配
        **/

        let next_navigation_item_open = ishavachildren ? "next-navigation-item-opened next-navigation-item-tree-title ":"nav_link"
        next_navigation_item_open = copy_actvieType ? next_navigation_item_open :'nav_link'; //|| sub_activeType || selectType

        if(next_navigation_item_open == 'nav_link' && sub_activeType){
            next_navigation_item_open = 'nav_link_active';
        }

        let nav_style = ishavachildren ? {paddingLeft:"0px",overflow:"hidden"}:{};


        let nav_active_style = {};
        let nav_item_select = "";

        if(selectType){
            nav_active_style = {"backgroundColor":"#f7f8fa"};
            nav_item_select = "next-navigation-item-selected next-navigation-item-selected-right"
        }
        if(next_navigation_item_open == 'nav_link_active'){
            nav_active_style.backgroundColor = "#f7f8fa";
            nav_active_style.borderRight = "2.5px solid #3089DC";
        }

        return (
            <li className={`next-navigation-item  ${next_navigation_item_open} ${nav_item_select}`} style = {nav_active_style}  >
                <div className="next-navigation-item-content" style={nav_style}>
                        {span_sub_icon(ishavachildren)}
                </div>
                {children}
            </li>
        );
    }
    render(){
        return this.init();
    }
}

function mapStateToProps(state, ownProps){
    return {
        activeType:state.Myitem.active,
        activeId:state.Myitem.id,
        router:state.routing.locationBeforeTransitions,
        selectType:state.routing.locationBeforeTransitions.pathname === ownProps.link
    }
}
function mapDispatchToProps(dispatch,ownProps){
    return {
        itemMouseOver:() => {
            dispatch(select(ownProps.itemId));
        },
        itemActive:(activetype)=>{
            dispatch(active(ownProps.itemId,activetype));
        },
        itemUnline:()=>{
            dispatch(active(ownProps.itemId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Myitem)
