import React from 'react';


import {Button, Dialog, Table, Icon, NumberPicker,  Input} from 'qnui'


import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions'

import {cell_title,cell_fee} from '../Table/InventoryTableConfig'


class OptionDialog extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){

    }
    render() {
        const {text, visible, dataSource, actions } = this.props;

        const cell_delete = (value)=>{
            return <a style ={{cursor: 'pointer'}} onClick = {()=>{actions.optionDelete(value)}}><Icon type="close"  size="xs"/></a>
        }
        const cell_num = (value, index, record)=>{
            return <NumberPicker value = {value} onChange = {(value)=>{actions.optionNumChange(value,record)}} />
        }
        const cell_fee =  (value, index, record)=>{
            return (<span style={{display:"inline-block",color:'#FFA033'}}>

                        <Input style={{width: 80}}  placeholder = '请输入' value= {value}  onChange = {(value)=>{actions.optionPriceUpdate('price',value,record)}}/>
                    </span>)
        }

        const cell_fee_sum =  (value, index, record)=>{
            return (<span style={{display:"inline-block",color:'#FFA033'}}>

                        <Input style={{width: 80}} placeholder = '请输入' value= {value}  onChange = {(value)=>{actions.optionPriceUpdate('price_sum', value,record)}}/>
                    </span>)
        }


        let title= (
            <span>{text} <font className = "dialog-title">{text == '入库'? '请填写真实采购数量、成本/总价，入库后' : '请填写出库数量、成本，出库后'}，系统将重新计算该商品成本价</font></span>
        )
        return (
            <div>
                <Button type="secondary" style={{marginRight:"10px"}}  onClick={()=>{actions.optionOnOpen('入库')}} >入库</Button>
                <Button type="secondary" style={{marginRight:"10px"}}  onClick={()=>{actions.optionOnOpen('出库')}} >出库</Button>
                <Dialog visible = {visible}
                        onOk = {actions.optionOnClose}
                        onCancel = {actions.optionOnClose}
                        onClose = {actions.optionOnClose} title = {title}
                        style={{width:"900px",height:"700px",maxHeight:"700px"}}>
                    <div  className="inventory-button-table" >
                        <Table
                            className = "inventory-button-table-inner"
                            primaryKey="ebs_sku_id"
                            dataSource={dataSource}
                            optimization={true}
                            isLoading = {false}
                            hasBorder = {false}
                        >
                            <Table.Column title=""     width={20}  dataIndex="ebs_sku_id" cell= {cell_delete}/>
                            <Table.Column title="商家编码"     width={60}  dataIndex="sub_outer_id" />
                            <Table.Column title="商品名称"           width={120}  dataIndex="title" cell={cell_title} />
                            <Table.Column title="商品规格"          width={120}  dataIndex="prop_name"  />
                            <Table.Column title="数量"      width={60}  dataIndex="num" cell={cell_num}/>
                        <Table.Column title="单价成本(¥)" width={60}  dataIndex="cost_price"   cell = {cell_fee}/>
                    <Table.Column title="采购总价(¥)"   width={60}   dataIndex="price_sum"   cell={cell_fee_sum}  />
                        </Table>
                        <Button type="primary" shape="text">+添加商品</Button>
                    </div>
                </Dialog>
            </div>
        );
    }

}

export default connect(
    (state)=>state.OptionDialog,
    (dispatch)=>({actions: bindActionCreators(actions,dispatch)})
)(OptionDialog);
