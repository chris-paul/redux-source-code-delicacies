import React from 'react';


import {Button, Input, Field} from 'qnui'
import Select, {Option} from 'qnui/lib/select';

import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions'


class SearchTop extends React.Component {
    field = new Field(this); //表单通用组件统一管理输入类控件属性和状态
    constructor(props) {
        super(props);
        this.state={
            option:[],
            ischange:false
        }
    }
    toDoSearch(){//查询库存列表
        var parm = this.field.getValues();
        const {actions} = this.props;
        actions.getInventoryList({ //事件委托给InventoryList,实现切换仓库后刷新规格库存列表
            'page_num':localStorage.getItem('ebs_stock_pagesize'),
            'page_no':1,
            'isLoading':'false',
            'total':0,
            'sort':'',
            'order_filter':'',
            'stock_id':parm.searchType,//仓库
            'stock_item':isEmpty(parm.searchItem)?'':parm.searchItem,//商品标题/规格关键字
            'stock_outId':isEmpty(parm.searchOutId)?'':parm.searchOutId,//商家编码
            'stock_barcord':isEmpty(parm.searchBarCord)?'':parm.searchBarCord,//条形码
            'stock_num_iid':isEmpty(parm.searchNumIid)?'':parm.searchNumIid//淘宝id
        });
    }


    componentDidMount(){
        //初始化获取仓库列表
        actions.c_api("ebs.stock.getStockList", { }, e => {
            if(!isEmpty(e)){
                const dataSource = e.data.map(stock=>{
                    if(stock.stock_name == '默认仓库')this.field.setValue('searchType', stock.id);
                    return {id:stock.id,value:stock.stock_name}
                });
                this.setState({option:dataSource,
                    ischange:!this.state.ischange});//引起事件重绘

            }
        });
    }
    render() {
        const init = this.field.init;//初始化表单通用组件
        const {actions} = this.props;
        return (
                <div  className="inventory-search" >
                    <Select className="select_m" placeholder="默认仓库"  {...init('searchType',{
                          props:{
                            onChange:(v)=>{
                              console.log(v);
                              actions.getInventoryList({ //事件委托给InventoryList,实现切换仓库后刷新规格库存列表
                                  'page_no':1,
                                  'page_num':localStorage.getItem('ebs_stock_pagesize'),
                                  'total':0,
                                  'sort':'',
                                  'order_filter':'',
                                  'isLoading':'false',
                                  'stock_id':v,
                              });
                            }
                          }
                        })}>
                        {this.state.option.map(stock=><Option key={stock.id} value={stock.id}>{stock.value}</Option>)}
                    </Select>
                    <label className="labels">关键字：
                        <Input  className="input"
                                hasClear
                                placeholder="请输入标题/规格关键字"
                                {...init('searchItem')}
                        />
                    </label>
                    <label className="labels">编码：
                        <Input  className="input"
                                hasClear
                                placeholder="请输入商家编码"
                                {...init('searchOutId')}
                        />
                    </label>
                    <label className="labels">条码：
                        <Input  className="input"
                                hasClear
                                placeholder="请输入商品条形码"
                                {...init('searchBarCord')}
                        />
                    </label>
                    <label className="labels">淘宝商品id：
                        <Input  className="input"
                                hasClear
                                placeholder="请输入淘宝商品id"
                                {...init('searchNumIid')}
                        />
                    </label>
                    <Button type="primary" style={{marginLeft:"10px"}}  onClick={this.toDoSearch.bind(this)}>搜索</Button>
                </div>
        );
    }

}

//export default SearchTop;
export default connect(
    (state)=>{},
    (dispatch)=>({actions: bindActionCreators(actions,dispatch)})
)(SearchTop);
