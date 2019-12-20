import React from 'react';


import {Button, Dialog, Table, Balloon} from 'qnui'


import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions'

class Log extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {visible, record, dataSource, isLoading, actions} = this.props;
        const footer = (<Button type="primary" onClick={()=>{actions.onchange(false)}}>关闭</Button>)
        return (
                <Dialog visible = {visible}
                        onOk = {()=>{onchange(true)}}
                        onCancel = {()=>{actions.onchange(false)}}
                        onClose = {()=>{actions.onchange(false)}} title = "操作日志"
                        style={{width:"900px",height:"700px",maxHeight:"700px"}}
                        closable = 'esc, mask, close'
                        footer = {footer}
                        >
                    <div style={{display:"flex",marginBottom:"10px"}}>
                        <Balloon closable={false} trigger={
                            <div style={{width:30}}>
                                <img style={{verticalAlign:"middle"}} src={`${record.pic_path}_30x30.jpg`} width={30} height={30} alt=""/>
                            </div>
                        } triggerType="hover">
                            <img style={{verticalAlign:"middle"}} src={`${record.pic_path}_150x150.jpg`} width={150} height={150} />
                        </Balloon>&nbsp;&nbsp;
                        <div style={{marginTop: "8px",justifyContent:"space-between",width: "100%",display: "flex"}}>
                            <font>{record.title}</font>
                            <span >{record.prop_name}</span>
                        </div>
                    </div>

                    <div  className="inventory-button-table" >
                        <Table
                            className = "inventory-button-table-inner"
                            primaryKey="ebs_sku_id"
                            dataSource={dataSource}
                            optimization={true}
                            isLoading = {isLoading}
                            hasBorder = {false}
                        >
                            <Table.Column title="时间"     width={130}  dataIndex="start_time" />
                        <Table.Column title="操作人"           width={100}  dataIndex="oper_nick"  />
                            <Table.Column title="操作内容"            dataIndex="detail"  />
                        </Table>
                    </div>
                </Dialog>
        );
    }

}
export default connect(
    (state)=>state.Log,
    (dispatch)=>({actions: bindActionCreators(actions,dispatch)})
)(Log);
