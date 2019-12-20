/**
    @author Mothpro
    @by 2017-05-10
**/
import {api,becaonNew} from '../../../actions/AY_API'


export const LOADING_INVENTORYTABLE = "LOADING_INVENTORYTABLE";//加载列表过渡动画效果
export const INVENTORYTABLE_GETORDER = "INVENTORYTABLE_GETORDER";//获取列表DataSource
export const INVENTORYTABLE_ONCHECK = "INVENTORYTABLE_ONCHECK";//获取列表checkbox选框选中与否

export function c_api(method,args="",callback){//集成api，方便层级调用
    api(method, args, callback);
}
export function ebsOwnerChangeBrandCat(dataSource){//绑定共享store -> EbsOwner
    return (dispatch,getState)=>{
        dispatch({
            type:'ebsOwnerChangeBrandCat',
            dataSource:dataSource
        });
    };
}


const getInventoryList_func = function (condition,refsh = true,dispatch,getState){//获取列表DataSource
        dispatch({type:LOADING_INVENTORYTABLE});//动画过渡
        becaonNew("kcgl","TD20170527110531");
        api("ebs.stock.getInventoryList",condition,function(e){
            console.log(e);
            let sort = '';
            if(condition.sort != undefined){
                sort = condition.sort;
            }else{
                sort = getState().InventoryTable.sort;
            }
            let filterParams = "{}";
            if(condition.order_filter != undefined){
                if(condition.order_filter != ''){
                    filterParams = JSON.parse(condition.order_filter);
                }else{
                    filterParams = condition.order_filter;
                }
            }else{
                filterParams = getState().InventoryTable.filterParams;
            }
            // let ItemsSelectedArr = e.result.map((c)=>{//初始化列表复选框组
            //     return false;
            // });
            refsh = refsh? false:true;
            // let goodsArrSort = e.result
            // console.log(goodsArrSort);
            // for(let i in goodsArrSort){
            //     if(!isEmpty(goodsArrSort[i].prop_name)){
            //         let goodsStrSplit = goodsArrSort[i].prop_name.split(';');
            //         for(let j=i+1;j<50-i;){
            //             if(goodsStrSplit[0] == goodsArrSort[j].prop_name.split(';')[0]){
            //                 console.log('换位置');
            //                 // goodsArrSort.splice(i+1,0,goodsArrSort[j]);
            //                 // goodsArrSort.splice(j+1);
            //                 break;
            //             }else{
            //                 j++
            //             }
            //         }
            //     }
            // }
            dispatch({
                type:INVENTORYTABLE_GETORDER,
                isLoading:false,
                orderData:e.result,
                selectCondition:condition,
                // ItemsSelectedArr:ItemsSelectedArr,
                page_num:e.page_num,
                total:e.total,
                page_no:e.page_no,
                sort:sort,
                filterParams:filterParams,
                refsh:refsh
            });
        });
}

export function getInventoryList(condition,refsh = true){//获取列表DataSource
    return (dispatch,getState)=>{
        getInventoryList_func(condition,refsh = true,dispatch,getState);
    };
}

// 列表多选
export function onCheck(keys) {
    return (dispatch,getState)=>{
        let disabled = keys.length > 0 ? false: true;
        //let disabledForOption = getState().get
        dispatch({//委托BatchUpdate，根据列表库存规格的选中状况启用Option按钮或者禁用
            type : INVENTORYTABLE_BATCHUPDATE_DISABLED,
            disabled:disabled
        })

        dispatch({
            type : INVENTORYTABLE_ONCHECK,
            keys:keys,
        })
    }
}
//==================================================================================================================================

export const INVENTORYTABLE_LOG_CHANGE = "INVENTORYTABLE_LOG_CHANGE";//日志弹框关闭展示与否
export const INVENTORYTABLE_LOG_SHOW = "INVENTORYTABLE_LOG_SHOW";//日志展示

export function onchange(state, record = {}){
    return (dispatch,getState)=>{
        if(state){//visible为true
            let stock_id = getState().InventoryTable.selectCondition.stock_id;
            api("ebs.stock.getStockLog",{
                ebs_sku_id:record.ebs_sku_id,
                stock_id:stock_id
            },function(e){
                console.log(e);
                if(!isEmpty(e)){
                    dispatch({
                        type: INVENTORYTABLE_LOG_SHOW,
                        dataSource:e.data,
                        isLoading:false
                    })
                }else{
                    //获取日志数据格式有问题
                }
            });
        }
        dispatch({
            type: INVENTORYTABLE_LOG_CHANGE,
            visible:state,
            record:record
        })
    };
}


//==================================================================================================================================
import {Feedback} from 'qnui'


export const INVENTORYTABLE_BATCHUPDATE_DISABLED = "INVENTORYTABLE_BATCHUPDATE_DISABLED";//入库、出库、批量修改disabled状态管理

export function optionHasDisabled(disabled){//入库、出库、批量修改disabled状态管理
    return (dispatch,getState)=>{
        dispatch({
            type : INVENTORYTABLE_BATCHUPDATE_DISABLED,
            disabled:disabled
        })
    }
}

export function batchUpdatestock(json){
    return (dispatch,getState)=>{
        const inventoryTable = getState().InventoryTable;
        const selectedRowKeys = inventoryTable.selectedRowKeys;
        const stock_id = inventoryTable.selectCondition.stock_id;
        api("ebs.stock.batchUpdateStock",{
            ebs_sku_ids:selectedRowKeys.join("','"),
            jsons:JSON.stringify(json),
            stock_id:stock_id
        },function(e){
             console.log(e);
            Feedback.toast.success('操作成功');
            console.log(inventoryTable.refsh);
            getInventoryList_func({ //事件委托给InventoryList,实现切换仓库后刷新规格库存列表
                ...inventoryTable.selectCondition,
                'isLoading':'false',
                'stock_id':e.stock_id
            },inventoryTable.refsh,dispatch,getState);
        });
    }
}

//=============================================================================================================
export const INVENTORYTABLE_OPTIONBUT_VISIBLE = "INVENTORYTABLE_OPTIONBUT_VISIBLE";
export const INVENTORYTABLE_OPTIONBUT_DELETE = "INVENTORYTABLE_OPTIONBUT_DELETE";
export function optionOnOpen(text){
    return (dispatch,getState)=>{
        const inventoryTable = getState().InventoryTable;


        let dataSource = [];
        inventoryTable.selectedRowKeys.map((c)=>{
            return inventoryTable.dataSource.map((j)=>{
                if(j.ebs_sku_id == c){
                    j.num = 1;
                    j.cost_price = Number(j.cost_price).toFixed(2);
                    j.price_sum = Number(j.cost_price * 0).toFixed(2);
                    dataSource.push(j);
                }
            })
        })
        dispatch({
            type:INVENTORYTABLE_OPTIONBUT_VISIBLE,
            visible:true,
            text:text,
            dataSource:dataSource
        })

    }
}
export function optionDelete(id){//入库、出库商品删除
    return (dispatch,getState)=>{
        //dataSource = getState().OptionDialog.dataSource;
        let dataSource = [];
        getState().OptionDialog.dataSource.map((c)=>{
            if(c.ebs_sku_id != id){
                dataSource.push(c);
            }
        })
        dispatch({
            type:INVENTORYTABLE_OPTIONBUT_DELETE,
            dataSource:dataSource
        })
    }
}
export function optionNumChange(value, record){//入库、出库数量修改
    return (dispatch,getState)=>{
        if(value > 0){
            let dataSource = getState().OptionDialog.dataSource.map((c)=>{
                if(c.ebs_sku_id == record.ebs_sku_id){
                    c.num = value;
                    c.price_sum = Number(c.num * c.cost_price).toFixed(2);//单价 * 数量
                }
                return c;
            })

            dispatch({
                type:INVENTORYTABLE_OPTIONBUT_DELETE,
                dataSource:dataSource
            })
        }

    }
}
export function optionPriceUpdate(type, value, record){//入库、出库价格/总采购价修改
    return (dispatch,getState)=>{
        if(!isNaN(value)){
            let dataSource = getState().OptionDialog.dataSource.map((c)=>{
                if(c.ebs_sku_id == record.ebs_sku_id){
                    if(type == 'price'){
                        c.cost_price = value;//单价
                        c.price_sum = Number(c.cost_price * c.num).toFixed(2);//单价 * 数量
                    }else{
                        c.price_sum = value;//总采购价
                        c.cost_price = Number(c.price_sum/c.num).toFixed(2); Number(value).toFixed(2);//总采购价 / 数量
                    }
                }
                return c;
            })
            dispatch({
                type:INVENTORYTABLE_OPTIONBUT_DELETE,
                dataSource:dataSource
            })
        }
    }
}
export function optionOnClose(){
    return (dispatch,getState)=>{
        dispatch({
            type:INVENTORYTABLE_OPTIONBUT_VISIBLE,
            visible:false
        })
    }
}
