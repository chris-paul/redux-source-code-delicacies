import React from 'react';

import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions'

import {title, cell_title, cell_num, cell_fee, cell_str} from './InventoryTableConfig'

import Filter from "./Filter";


import {Button, Input, Table, Pagination,Select} from 'qnui'



class InventoryTable extends React.Component {
    constructor(props) {
        super(props);
        this.RECORD = false;//全局变量用于存储rowclick后的行列详情
    }
    cell_oper(value,index,record){
        const {actions} = this.props;
        return (
            <Button type="primary" shape="text" onClick = {()=>{actions.onchange(true,record)}}>日志</Button>
        );
    }
    render() {
        const {isLoading, dataSource, total , page_no, page_num, selectedRowKeys, actions, sort, filterParams} = this.props;

        

        const brandcat = (
            <Filter
              title="分类"
              type = "brandcat"
              value = {filterParams}
              onFilter={this.onFilter.bind(this)}
          />
        )

        return (
                <div  className="inventory-table" >
                    <Table
                        className = "inventory-table-inner"
                        primaryKey="ebs_sku_id"
                        dataSource={dataSource}
                        optimization={true}  //开启性能优化
                        isLoading = {isLoading}
                        hasBorder = {false}
                        onRowClick = {this.onRowClick.bind(this)}
                        rowSelection = {{ onChange: actions.onCheck, selectedRowKeys}}
                        sort = {sort}
                        onSort = {this.onSort.bind(this)}
                        onFilter = {this.onFilter.bind(this)}
                    >
                        <Table.Column title={title.item_info}     width={200}  dataIndex="title" cell={cell_title}/>
                        <Table.Column title={title.sku}           width={280}  dataIndex="prop_name" sortable cell={cell_str} />
                        <Table.Column title={brandcat}           width={100}  dataIndex="brandcat" cell={cell_str} />
                        <Table.Column title={title.outer_id}      width={100}  dataIndex="sub_outer_id" />
                        <Table.Column title={title.stock_default} width={85}  dataIndex="default_num" sortable cell={cell_num} />
                        <Table.Column title={title.stock_check}   width={85}   dataIndex="lock_num"   sortable cell={cell_num} />
                        <Table.Column title={title.stock_use}     width={85}  dataIndex="useing_num"    sortable  cell={cell_num}/>
                        <Table.Column title={title.price}         width={70}  dataIndex="cost_price"     sortable cell={cell_fee}/>
                    <Table.Column title={title.oper}          width={100}  dataIndex="ebs_sku_id"  align="center" cell={this.cell_oper.bind(this)}/>
                    </Table>

                    <div style={{marginTop:6,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div style={{color: "#999"}}>
                            共计 {total} 条商品规格信息，
                            <span style={{color: "#999"}}>每页</span>
                        <Select value={page_num} onChange={this.pageSizeOnChange.bind(this)} className="search-item" style={{verticalAlign: "middle",textAlign:"left",fontSize:"12px",minWidth: "60px"}} placeholder="每页条数">
                                <Select.Option value="50">50</Select.Option>
                                <Select.Option value="100">100</Select.Option>
                                <Select.Option value="200">200</Select.Option>
                            </Select>
                            <span style={{color: "#999"}}>条</span>
                        </div>

                        <Pagination
                            type = "simple"
                            current= {page_no}
                            pageSize={page_num}
                            shape = "no-border"
                            total= {total}
                            onChange= {this.pageOnChange.bind(this)}
                        />
                    </div>
                </div>
        );
    }


    pageOnChange(val, e){//翻页
        const {actions, selectCondition} = this.props;
        actions.getInventoryList(Object.assign({},selectCondition,{
            page_no:val
        }));
    }
    pageSizeOnChange(v){
        localStorage.setItem('ebs_stock_pagesize',v);//表格显示数量总数记录缓存
        const {actions, selectCondition} = this.props;
        actions.getInventoryList(Object.assign({},selectCondition,{
            page_num:v
        }));
    }
    onFilter(filterParams){//列表过滤
        console.log(filterParams.brandcat);
        const {actions, selectCondition} = this.props;
        actions.getInventoryList(Object.assign({},selectCondition,{
            page_no:1,
            total:0,
            order_filter:JSON.stringify(filterParams),
        }));
    }
    onSort(dataIndex, order, sort){//列表排序
        const {actions, selectCondition} = this.props;
        console.log(order);
        actions.getInventoryList(Object.assign({},selectCondition,{
            page_no:1,
            total:0,
            order_sort:dataIndex+","+order,
            sort:sort
        }));

    }
    onRowClick(order_info, index, e){//每行被单机时，改变该行的单元列背景色
        this.RECORD = order_info;
        if(e != "nocell"){
            let element_arr = document.querySelectorAll('.next-table-row');
            for(let i = 0; i < element_arr.length; i++){
                if(i == index){
                    element_arr[i].style.backgroundColor="#f2f2f2";
                }else{
                    element_arr[i].style.backgroundColor="";
                }
            }
        }
    }
    componentDidMount(){
        window.onresize = function() {//监听页面变动，设置表格内容适配
            this.changeLastColWidth();
        }.bind(this);

        // 空格 切换 select
        document.onkeydown = (e)=>{
            const {selectedRowKeys, actions} = this.props;

            if (e.keyCode === 32 && e.target == document.body && this.RECORD) {

                e.preventDefault();
                let selectedRowKeysNew = [...selectedRowKeys];
                const index = selectedRowKeys.indexOf(this.RECORD.ebs_sku_id);
                if (index === -1) {
                    selectedRowKeysNew.push(this.RECORD.ebs_sku_id)
                }else {
                    selectedRowKeysNew.splice(index, 1)
                }
                actions.onCheck(selectedRowKeysNew)
            }
        }

        // document.onkeypress = (event)=>{
        //     if (event.which == 32) {
        //         event.preventDefault();
        //         let element_arr = document.querySelectorAll('.next-table-row');
        //         for(let i = 0; i < element_arr.length; i++){
        //             if(element_arr[i].style.backgroundColor == "rgb(242, 242, 242)"){
        //                 let new_ItemsSelected = [...this.props.ItemsSelectedArr];
        //                 new_ItemsSelected[i] = new_ItemsSelected[i]?false:true;
        //                 this.props.itemsCheckedOnChange(new_ItemsSelected);
        //             }
        //         }
        //     };
        // };
        const {actions, isLoading} = this.props;
        // const stock_id = this.props.field.getValue('searchType');
        // console.log(stock_id);
        var page_num = localStorage.getItem('ebs_stock_pagesize');
        if(isEmpty(page_num)){
            page_num = 50;
            localStorage.setItem('ebs_stock_pagesize',page_num);
        }
        actions.getInventoryList({//获取商品及库存列表
            // 'search_value':searchValue,
            // 'filter_value':selectCondition.filter_value,
            // 'sort_value':selectCondition.sort_value,
            'page_no':1,
            'page_num':page_num,
            'isLoading':isLoading,
            'stock_id':''
        });
    }
    componentDidUpdate(prevProps, prevState) {
        this.changeLastColWidth();

        //当 有数据请求并且加载完
        if ((prevProps.isLoading && !this.props.isLoading)) {
            document.querySelector('.inventory-table-inner .next-table-body').scrollTop = 0; // 回到表格顶部
        }
    }
    componentWillUnmount() {
        window.onresize = null;
    }
    changeLastColWidth() {// 改变最后一列表头宽度
        const tablebody = document.querySelector(
            ".inventory-table-inner>.next-table-inner>.next-table-body"
        );
        const col_last = document.querySelector(
            ".inventory-table-inner>.next-table-inner>div>.next-table-header-inner>table>colgroup col:last-child"
        );
        const col_last_width = 100;//这是最后一行table列的宽度

        col_last.style.width = tablebody.scrollHeight > tablebody.offsetHeight
            ? `${col_last_width + 10}px`
            : `${col_last_width}px`;
    }
}
export default connect(
    (state)=>state.InventoryTable,
    (dispatch)=>({actions: bindActionCreators(actions,dispatch)})
)(InventoryTable);
