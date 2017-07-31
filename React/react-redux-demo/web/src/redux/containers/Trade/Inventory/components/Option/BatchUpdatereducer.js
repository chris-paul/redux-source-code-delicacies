import * as actions from '../../actions'
const initialState = {
    visible:false,        //日志弹框显示与否
    disabled:true
}
export default function (state=initialState, action) {
    switch (action.type) {
        case actions.INVENTORYTABLE_BATCHUPDATE_DISABLED:
            return Object.assign({},state,{
                disabled:action.disabled,
            })
            break;
        default: return state;
    }
}
