/**
 * 每次打出action的日志,必须放在中间件数组的最后面
 * @param {[type]} dispatch [description]
 * @param {[type]} getState [description]
 */
export default function addlogMiddware({ dispatch, getState }){
    return (next) => (action) => {
        //按照action类型进行输出分组，保证在同一个action下拥有相同的日志title
        console.group(action.type);
        //打印更新前的state
        console.log('%c preview  state','color: gray',getState());
        //打印当前action
        console.log('%c action','color: blue',action);
        //调用原来的dispatch并记录返回值
        const returnVlaue = dispatch(action);

        //打印更新后的state
        console.log('%c next state','color: green',store.getState());

        console.group(action.type);

        return returnVlaue;

    }
}
