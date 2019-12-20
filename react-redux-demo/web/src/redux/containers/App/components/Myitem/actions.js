export const SELECT_ITEM = "MYITEM_SELECT_ITEM"

export const SELECT_CLICK = "MYITEM_SELECT_CLICK"

export function select(item_id){
    return {
        type:SELECT_ITEM,
        itemId:item_id
    }
}
export function active(item_id,activetype){
    return {type:SELECT_CLICK,
    itemId:item_id,
    activeType:activetype
    }
}

export const activeUnline = (item_id) => {
  return (dispatch, getState) => {
      dispatch(active_init(item_id,getState().Myitem.activeType))
  }
}
