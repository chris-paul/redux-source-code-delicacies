import * as actions from '../../actions'
const initialState = {
    isLoading:false,        //是否需要显示过载动画
    dataSource:[],          //Table数据源
    selectedRowKeys:[],    //Table复选框组选中状态Arr
    total:0,                //商品规格总记录数
    page_no:1,               //当前页码
    page_num:50,            //一页显示的数量
    sort:'',                //排序
    filterParams:"",        //过滤
    selectCondition:{
        'page_no':1,
        'page_num':50,
        'isLoading':false,
        'total':0,
        'stock_id':'',//仓库
        'stock_item':'',//商品关键字
        'stock_outId':'',//商家编码
        'stock_barcord':'',//条形码
        'stock_num_iid':'',//淘宝id
        'order_sort':'',       //排序
        'order_filter':'',      //顾虑
    },
    refsh:true

}
export default function (state=initialState, action) {
    switch (action.type) {
        case actions.LOADING_INVENTORYTABLE:
            return Object.assign({},state,{
                isLoading:true
            })
        break;
        case actions.INVENTORYTABLE_GETORDER:
            return Object.assign({},state,{
                isLoading:action.isLoading,
                dataSource:action.orderData,
                // selectedRowKeys:action.ItemsSelectedArr,
                total:action.total,
                page_num:action.page_num,
                page_no:action.page_no,
                selectCondition:action.selectCondition,
                sort:action.sort,
                filterParams:action.filterParams,
                refsh:action.refsh
            })
        break;
        case actions.INVENTORYTABLE_ONCHECK:
            return Object.assign({},state,{
                selectedRowKeys:action.keys
            })
        break;

        default: return state;
    }
}
