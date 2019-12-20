import React from 'react';


import {Button, Input, Dialog, Field, Feedback} from 'qnui'
import Radio, { Group as RadioGroup } from 'qnui/lib/radio';


import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions'


class BatchUpdate extends React.Component {
    Toast = Feedback.toast;
    field = new Field(this); //表单通用组件统一管理输入类控件属性和状态
    constructor(props) {
        super(props);
        this.state={
            visible:false
        }
    }
    onClose(){
        this.setState({visible:false})
    }
    onOpen(){
        this.setState({visible:true})
    }
    onSubmit(){
        this.Toast.hide();
        var checkType = this.field.getValue('checkType');
        var tval = this.field.getValue(checkType);
        if(isEmpty(tval)){
            this.Toast.error('请输入需要修改的库存数量');
        }else{
            let json = {};
            json.type = checkType;
            json.value = tval;
            this.props.actions.batchUpdatestock(json);//批量修改库存
            this.onClose();
        }
    }
    componentDidMount(){

    }
    render() {
        console.log('渲染Batch');
        const init = this.field.init;//初始化表单通用组件
        const {disabled} = this.props;
        return (
            <div>
                <Button type="secondary" style={{marginRight:"10px"}}  onClick={()=>{this.onOpen();}} disabled = {disabled}>批量改库存</Button>
                <Dialog visible = {this.state.visible}
                        onOk = {this.onSubmit.bind(this)}
                        onCancel = {this.onClose.bind(this)}
                        onClose = {this.onClose.bind(this)} title = "批量修改库存">
                        <RadioGroup {...init('checkType', {initValue: 'only'})} >
                            <p>
                                <Radio id="only" key="only" value="only" /><label htmlFor="only" className="next-radio-label">每个商品库存统一为：
                                    <Input
                                            placeholder="0"
                                            {...init('only')}
                                    />
                                </label>
                            </p>
                            <p>
                                <Radio id="add" key="add" value="add" /><label htmlFor="add" className="next-radio-label">每个商品库存要增加：
                                    <Input
                                            placeholder="0"
                                            {...init('add')}
                                    />
                                </label>
                            </p>
                            <p>
                                <Radio id="sub" key="sub" value="sub" /><label htmlFor="sub" className="next-radio-label">每个商品库存要减少：
                                    <Input
                                            placeholder="0"
                                            {...init('sub')}
                                    />
                                </label>
                            </p>
                        </RadioGroup>
                </Dialog>
            </div>
        );
    }

}

export default connect(
    (state)=>state.BatchUpdate,
    (dispatch)=>({actions: bindActionCreators(actions,dispatch)})
)(BatchUpdate);
