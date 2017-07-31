import Dialog from 'qnui/lib/dialog';

export const GET_LIST = "GET_LIST"
export const GET_ARGS = "GET_ARGS"

window.apiForError = false
/**
 * uri => 后端地址
 * args => 传入参数
*/
export function api(method,args="",callback){
    // /api
    // method=aiyong.foreigntrade.ft.getinformation&version=xxxx&category_id=abc
    // api("ebs.orders.list",1,args,demo()) 调用示例
    let url = "https://ebs.aiyongbao.com/api";
    if(__DEV__){
        url = "//devebs.aiyongbao.com/api";
    }
    if(location.host == "https://testebs.aiyongbao.com"){
        url = "https://testebs.aiyongbao.com/api";
    }
    const uri = url;
    const version = 1;
    args = toQueryString(args);
    if(args!=""){
        args = "&"+args;
    }
    fetch(uri,{
            method: "POST",
            mode: "cros",
            credentials: 'include',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: "method="+method+"&version="+version+args
        })
    .then((response) => response.json())//返回数据类型json
    .then((responseText) => {
        if(responseText.code==403){
            //遇见错误时弹框提示   by Mothpro
            // if(!window.apiForError){
            //     window.apiForError = true
            //     Dialog.alert({
            //        content:responseText.msg,
            //        closable: false,
            //       // title: '登陆失效',
            //        onOk: () => {
            //            window.apiForError = false
            //        }
            //      })
            // }
        }else{
            callback(responseText);
        }
    })
    .catch((error) => {
        //错误处理，待补充
    });
}
//埋点方法
export function becaonNew(event,eventName){
    let url = "https://mcs.aiyongbao.com/1.gif?t=" + (new Date).getTime() + "&p=" + eventName + "&n=" + user_nick + "&e=" + event + "&corp_nick=" + corp_nick;
    const uri = url;
    const version = 1;
    fetch(uri,{
            method: "POST",
            mode: "cros",
            credentials: 'include',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: "version="+version
        })
    .then((responseText) => {
        console.log(responseText);
    })
    .catch((error) => {
        //错误处理，待补充
    });
}

/**
 * 组件参数传递
*/
export function getargs(args){
    return {
        type:GET_ARGS,
        data:args
    }
}

/*
把json格式解析为参数参数字符串
*/
function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}
