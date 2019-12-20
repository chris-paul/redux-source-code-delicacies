import { SELECT_ITEM, SELECT_CLICK } from './actions'

export default function Myitem(state = {
    id:"item1",
    active:false
}, action){
    switch (action.type) {
        case SELECT_ITEM:
            return {
                    id:action.itemId,
                    active:true
            };
            break;
        case SELECT_CLICK:
            let isactive = action.activeType?false:true;
            return {
                    id:action.itemId,
                    active:isactive
            };
        default:
            return state;
    }
}
