import * as actions from '../../actions'
const initialState = {
    visible:false,        //日志弹框显示与否
    record:{},            //列表中传递过来的数据json
    isLoading:false,
    dataSource:[]
}
export default function (state=initialState, action) {
    switch (action.type) {
        case actions.INVENTORYTABLE_LOG_CHANGE:
            return Object.assign({},state,{
                visible:action.visible,
                record:action.record,
                isLoading:true
            })
            break;
        case actions.INVENTORYTABLE_LOG_SHOW:
            return Object.assign({},state,{
                dataSource:action.dataSource,
                isLoading:action.isLoading
            })
            break;
        default: return state;
    }
}
