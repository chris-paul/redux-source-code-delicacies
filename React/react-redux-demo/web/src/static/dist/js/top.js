function wangwangPC(chat_loginId,contents,type) {
    console.log(type);
    if(type == "1688"){
        var wangwangnick = 'cnalichn' + chat_loginId;
    }else{
        var wangwangnick =  chat_loginId;
    }
    var content = contents;
    QN.wangwang.invoke({
        "category": 'wangwang',
        "cmd": 'openChat',
        "param": {'nick': wangwangnick},
        "success": function (rsp) {
            QN.wangwang.invoke({
                category: 'wangwang',
                cmd: 'insertText2Inputbox',
                param: {'uid': wangwangnick, 'text': content, 'type': 0},
                success: function (rsp) {

                },
                error: function (msp) {
                }
            });
        },
        "error": function (msp) {
        }
    });
}

function isEmpty(keys){
    if(typeof keys==="string"){
        keys=keys.replace(/(^\s*)|(\s*$)/g,"");
        if(keys==""||keys==null||keys=="null"||keys==undefined||keys=="undefined"|| keys =="[]"){
            return true
        }else{
            return false
        }
    }else{
        if(typeof keys==="undefined"){
            return true
        }else if(keys == null){
            return true
        }else{
            return false
        }
    }
}

/**
 * 物流code -> 物流name
 */
 /*顺丰(SF)（暂时不支持新接入，之前接入的可以正常使用）、EMS标准快递(EMS)、EMS经济快
 件(EYB)、宅急送(ZJS)、圆通(YTO)、中通(ZTO)、百世汇通(HTKY)、优速(UC)、申通(STO)、
 天天快递 (TTKDEX)、全峰(QFKD)、快捷(FAST)、邮政小包(POSTB)、国通(GTO)、韵达(YUNDA)
 、德邦快递(DBKD)。百世快运  BESTQJT 中国邮政国内标快 POST_5000000007756*/
function marchCP(code){
    var cpName = "";
    switch (code) {
        case  "SF":cpName ="顺丰速运";break;
        case  "EMS":cpName ="EMS";break;
        case  "EYB":cpName ="EMS经济快递";break;
        case  "ZJS":cpName ="宅急送";break;
        case  "YTO":cpName ="圆通速递";break;
        case  "ZTO":cpName ="中通快递";break;
        case  "HTKY":cpName ="百世快递";break;
        case  "UC":cpName ="优速快递";break;
        case  "STO":cpName ="申通快递";break;
        case  "TTKDEX":cpName ="天天快递";break;
        case  "QFKD":cpName ="全峰快递";break;
        case  "FAST":cpName ="快捷快递";break;
        case  "POSTB":cpName ="邮政快递包裹";break;
        case  "GTO":cpName ="国通快递";break;
        case  "YUNDA":cpName ="韵达快递";break;
        case  "DBKD":cpName ="德邦快递";break;
        case  "BESTQJT":cpName ="百世快运";break;
        case  "5000000007756":cpName ="中国邮政国内标快";break;
        case  "100004928":cpName ="如风达";break;
        default:cpName = code;
    }
    return cpName;
}


function getAddressByShop(shopName){
    var seller_address = localStorage.getItem("seller_address_"+corp_id);
    if(seller_address){
        seller_address = JSON.parse(seller_address);
        if(seller_address["seller_nick"][shopName]){
            var def_type = seller_address["seller_nick"][shopName]["def_type"];
            var address_info = {
                send_name:seller_address["address"][def_type]["send_name"],
                send_phone:seller_address["address"][def_type]["send_phone"],
                send_mobile:seller_address["address"][def_type]["send_mobile"],
                send_state:seller_address["address"][def_type]["send_state"],
                send_city:seller_address["address"][def_type]["send_city"],
                send_district:seller_address["address"][def_type]["send_district"],
                send_address:seller_address["address"][def_type]["send_address"],
                send_company:seller_address["address"][def_type]["send_company"],
                send_zip:seller_address["address"][def_type]["send_zip"],
            };
            return address_info;
        }else{
            return {
                send_name:"",
                send_phone:"",
                send_mobile:"",
                send_state:"",
                send_city:"",
                send_district:"",
                send_address:"",
                send_company:"",
                send_zip:""
            };
        }
    }else{
        return {
            send_name:"",
            send_phone:"",
            send_mobile:"",
            send_state:"",
            send_city:"",
            send_district:"",
            send_address:"",
            send_company:"",
            send_zip:""
        };
    }
}

/**
 * [getOrderTablePageSize description]
 * 获取订单管理个页面的每页显示条数
 * order_type 订单类型
 * @return {[type]} [description]
 */
function getOrderTablePageSize(order_type){
    var page_size = localStorage.getItem("OrderTablePageSize"+corp_id);
    if(page_size){
        page_size = JSON.parse(page_size);
        if(page_size[order_type]){
            return page_size[order_type];
        }else{
            return 50;
        }
    }else{
        return 50;
    }
}

/**
 * [setOrderTablePageSize description]
 * 设置订单管理个页面的每页显示条数
 * order_type 订单类型
 * page_size 每页条数
 */
function setOrderTablePageSize(order_type,value){
    var page_size = localStorage.getItem("OrderTablePageSize"+corp_id);
    if(page_size){
        page_size = JSON.parse(page_size);
    }else{
        page_size = {};
    }
    page_size[order_type] = value;
    localStorage.setItem("OrderTablePageSize"+corp_id,JSON.stringify(page_size));
}


function GetDateStr(AddDayCount) {
   var dd = new Date();
   dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
   var y = dd.getFullYear();
   var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
   var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
   return y+"-"+m+"-"+d;
}

/**************************系统*******************/
Date.prototype.format = function(format){
    /*
     * eg:format="yyyy-MM-dd hh:mm:ss";
     */
    if(!format){
        format = "yyyy-MM-dd hh:mm:ss";
    }
    var o = {
        "M+": this.getMonth() + 1, /* month*/
        "d+": this.getDate(), /* day*/
        "h+": this.getHours(), /* hour*/
        "m+": this.getMinutes(), /* minute*/
        "s+": this.getSeconds(), /* second*/
        "q+": Math.floor((this.getMonth() + 3) / 3), /* quarter*/
        "S": this.getMilliseconds()

    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" +o[k]).length));
        }
    }
    return format;
};
