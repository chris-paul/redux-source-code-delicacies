

//初始化状态
const initialState = {
    'brandcat':[{
        value:"notloading",
        label:"分类信息获取中"
    }]
}

export default function EbsOwner(state = initialState, action){
    switch (action.type) {
        case 'ebsOwnerChangeBrandCat':
            console.log(action);
            return {
                brandcat:action.dataSource
            }
            break;
        default:
            return state;
    }
}
