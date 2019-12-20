import React from 'react';
import {Balloon,Button} from 'qnui'


export const title = {
    item_info:<div style={{width:"100%"}}>商品信息</div>,
    sku:'规格',
    outer_id:<div style={{width:"100%"}} >商家编码</div>,
    stock_default:"实际库存",
    stock_check:"锁定库存",
    stock_use:"可用库存",
    price:"成本价",
    oper:<div style={{width:"100%",textAlign:"center"}} >操作</div>,
}

// 价格
export function cell_fee(value) {
    return (<span style={{display:"inline-block",color:'#FFA033'}}>
                ¥{Number(value).toFixed(2)}
            </span>)
}
export function cell_str(value){
    return (<Balloon closable={false} trigger={<div className="ellipsis"> {value} </div>
    } triggerType="hover">
        {value}
    </Balloon>)
}
export function cell_num(value){
    return value;
}
// 商品信息cell
export function cell_title(value,index,record){
    return (
        <div style={{display:"flex"}}>
            <Balloon closable={false} trigger={
                <div style={{width:30}}>
                    <img style={{verticalAlign:"middle"}} src={`${record.pic_path}_30x30.jpg`} width={30} height={30} alt=""/>
                </div>
            } triggerType="hover">
                <img style={{verticalAlign:"middle"}} src={`${record.pic_path}_150x150.jpg`} width={150} height={150} />
            </Balloon>&nbsp;&nbsp;
            <Balloon closable={false} trigger={<div className="ellipsis"> {value} </div>
            } triggerType="hover">
                {value}
            </Balloon>
        </div>
    );
}
// // 商品简称
// export function cell_short_title(value,index,record) {
//     return <CellModify
//                 ebs_sku_id={record.ebs_sku_id}
//                 ebs_iid={record.ebs_iid}
//                 name="short_title"
//                 key={record.ebs_iid}
//                 value={value}
//             />
// }
