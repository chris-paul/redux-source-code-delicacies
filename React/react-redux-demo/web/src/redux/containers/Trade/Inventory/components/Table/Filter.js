import React from 'react'
import {Menu,Overlay,Input,Button} from 'qnui'

const Popup = Overlay.Popup;

import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import {c_api,ebsOwnerChangeBrandCat} from '../../actions.js'

//表头 输入过滤
class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            visible:false,

            dataSource:[],
            ischange:false,
        }
    }

    onVisibleChange = visible =>{
        if(this.props.value != ''){
            this.setState({visible});
        }else{
            this.setState({visible,value:""});
        }
    }

    toggle=()=>{
        this.setState((prevState)=>({
            visible: !prevState.visible
        }))
    }

    onConfirm=()=>{
        const {type} = this.props;
        const {value, order_filter} = this.state;
        this.toggle()
        this.props.onFilter({ [type]: order_filter})
    }

    onReset=()=>{
        this.setState({ value:"",order_filter:[]});
    }



    // 下拉多选
    onSelectKey = (selectKey,menuItem) =>{
        const {dataSource} = this.state;
        let order_filter = [];
        if(selectKey.length != dataSource.length){
            order_filter = selectKey;
        }
        this.setState({ value: selectKey,order_filter:selectKey });

    }

    componentDidMount(){
        console.log('渲染完毕，开始填充数据');
        const {brandcat, ebsOwnerChangeBrandCat} = this.props;
        if(brandcat[0].value == 'notloading'){//分类信息尚未初始化
            c_api("ebs.goods.getCat", { }, e => {
                if(!isEmpty(e)){
                    if(e.data.length > 0){
                        const dataSource = e.data.map(cat=>({label:cat.brandcat,value:cat.brandcat}));

                        this.setState({dataSource:dataSource,
                            ischange:!this.state.ischange});//引起事件重绘

                        ebsOwnerChangeBrandCat(dataSource);//改变共用store变量
                    }
                }
            });
        }

    }

    render() {
        const spanStyle = {
            border: '1px solid #ddd',
            padding: '10px',
            width: '202px',
            background: '#fff'
        }
        const {title, brandcat, value} = this.props;
        let dataSource = this.state.dataSource;
        if(brandcat.length > 0){
            if(brandcat[0].value != 'notloading'){//分类信息尚未初始化
                dataSource = brandcat;
            }
        }
        return(
            <span>
                {title}
                <Popup
                    trigger={<i className="next-icon next-icon-filter filter-input"></i>}
                    triggerType="click"
                    visible={this.state.visible}
                    onVisibleChange={this.onVisibleChange}
                >
                    <span style={spanStyle}>
                        <Menu
                            selectMode="multiple"
                            selectedKeys = {this.state.value}
                            onSelect = {this.onSelectKey}
                            style={{boxShadow:"none",border:"0px",marginLeft:"-10px",marginTop:"-10px"}}>
                        { dataSource.map(item=><Menu.Item key={item.value} checked>{item.label}</Menu.Item>) }
                        </Menu>
                        <Button type="primary" onClick={this.onConfirm}>搜索</Button>&nbsp;&nbsp;&nbsp;
                        <Button onClick={this.onReset}>重置</Button>
                    </span>
                </Popup>
            </span>
        )
    }
}
export default connect(
    (state)=>state.EbsOwner,//事件委托，借用全局reducer规则
    dispatch=>bindActionCreators({
        ebsOwnerChangeBrandCat
    }, dispatch) // 事件委托
)(Filter);
