import * as actions from '../../actions'
const initialState = {
    visible:false,        //日志弹框显示与否
    dataSource:[],
    text:'入库',
    isChange:false,
}
export default function (state=initialState, action) {
    switch (action.type) {
        case actions.INVENTORYTABLE_OPTIONBUT_VISIBLE:
            return {
                visible:action.visible,
                dataSource:action.dataSource,
                text: action.text,
                isChange: state.isChange
            }
        break;
        case actions.INVENTORYTABLE_OPTIONBUT_DELETE:
            return Object.assign({},state,{
                dataSource:action.dataSource,
                isChange:!state.isChange
            })
        default: return state;
    }
}
