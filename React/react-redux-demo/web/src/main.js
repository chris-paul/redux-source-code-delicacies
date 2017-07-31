import React from 'react'
import ReactDOM from 'react-dom'

//import routes from './routes'
import {Router, browserHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux';

import isEmptyObject from 'lodash/fp/isEmpty';
import { Provider } from 'react-redux'
import configureStore from './redux/stores/configureStore'
import {api} from './redux/actions/AY_API'

class App extends React.Component {
    render(){
    const {history,routes, store} = this.props

    return (
      <Provider store={store}>
          <Router history={history} children={routes} />
      </Provider>
    )
    }
}
//返回的store是一堆函数,通过dispatch可以触发一个actions,得到新的state
const store = configureStore();
console.log("初始化的store");
console.log(store.getState());
const history = syncHistoryWithStore(browserHistory, store);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('app')



let render = () => {
    const routes = require('./routes').default()
  ReactDOM.render(

      <App store = {store} history = {history} routes = {routes}/>,
    MOUNT_NODE
  )
}


// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEV__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}


/**
 * 和菜鸟组件进行连接
 * @author zdh
 */
function doConnect()
{
    window.webSocket = new WebSocket('wss://localhost:13529');
    /*如果是https的话，端口是13529*/
    /*window.webSocket = new WebSocket('wss://localhost:13529');*/
    /* 打开Socket*/
    window.webSocket.onerror =function(event){
        window.Gcn_success = 0;
    	console.log("没有安装新版菜鸟组件或者新版菜鸟组件没有打开",event);
        window.webSocket.close();
    }

    window.webSocket.onopen = function(event)
    {
        window.Gcn_success = 1;
        console.log("千牛组件连接成功！");
        // getElecFacePrinter();
        /*监听消息*/
        window.webSocket.onmessage = function(event)
        {
            console.log('Client received a message',event);
        };
        /*监听Socket的关闭*/
        window.webSocket.onclose = function(event)
        {
            console.log('Client notified webSocket has closed',event);
        };
    };
}




/**
 * 初始化表格配置信息
 * by zdh
 */
function initTableConfig(){


    localStorage.setItem("corpshop"+corp_id, "[]");
    api("ebs.EBSCorpShop.getCorpShop",{},function(e){
        if(!isEmpty(e)){
            localStorage.setItem("corpshop"+corp_id, JSON.stringify(e.corpshop));
        }
    });


    localStorage.setItem("shopLogtistics"+corp_id, "[]");
    api("ebs.EBSCorpShop.getCorpShopLogistics",{},function(e){
        if(!isEmpty(e)){
            localStorage.setItem("shopLogtistics"+corp_id, JSON.stringify(e.shop_logistics));
        }
    });
    localStorage.setItem("stockName"+corp_id, "[]");
    api("ebs.stock.getStockList",{},function(e){
        if(e.data){
            localStorage.setItem("stockName"+corp_id, JSON.stringify(e.data));
        }
    }.bind(this));



    let waitWeigh = localStorage.getItem(corp_id+"waitWeigh");
    let orderSearch = localStorage.getItem(corp_id+"orderSearch");
    let waitPay = localStorage.getItem(corp_id+"waitPay");
    let waitAudit = localStorage.getItem(corp_id+"waitAudit");
    let errorOrder = localStorage.getItem(corp_id+"errorOrder");
    let waitPrint = localStorage.getItem(corp_id+"waitPrint");
    let sweepCode = localStorage.getItem(corp_id+"sweepCode");
    let sendError = localStorage.getItem(corp_id+"sendError");
    if(!orderSearch || !waitPay || !waitAudit || !errorOrder || !sweepCode || !sendError || !waitPrint || !waitWeigh){
        api("ebs.item.getAllCustomColumn",{},function(e){
            for(let i = 0; i<e.result.length; i++){
                localStorage.setItem(e.result[i].corp_id+e.result[i].page_name, e.result[i].column_deatils);
            }
        });
    }
}

/**
 * 初始化信息
 * by zdh
 */
function initPrintDate(){
    let printModal = localStorage.getItem("printModal"+corp_id);
    if(!printModal){
        api("ebs.printData.getPrintModal",{},function(e){
            let printModalData = {
                public:e.public,
                private:e.private
            };
            localStorage.setItem("printModal"+corp_id, JSON.stringify(printModalData));
        });
    }/*快递单模板*/

    let deliveryModal = localStorage.getItem("deliveryModal"+corp_id);
    if(!deliveryModal){
        api("ebs.printData.getDeliveryMould",{},function(e){
            localStorage.setItem("deliveryModal"+corp_id, e.deliveryMould.buyerop);
        });
    }/*发货单模板*/

    let efModal = localStorage.getItem("efModal"+corp_id);
    if(!efModal){
        api("ebs.ElecFace.getPrivateEFModal",{},function(e){
            localStorage.setItem("efModal"+corp_id, JSON.stringify(e.result));
        });
    }/*电子面单模板*/

    let addressInfo = localStorage.getItem("addressInfo"+corp_id);
    let seller_address = localStorage.getItem("seller_address_"+corp_id);

    if(isEmpty(addressInfo)){
        api("ebs.Address.getAddressData",{},function(e){
            //console.log('这里要获取卖家的发货地址');
            localStorage.setItem("addressInfo"+corp_id, JSON.stringify(e.row));
        });
    }/*地址信息集合*/

    if(isEmpty(seller_address)){
        api("ebs.address.get",{},function(e){
            const seller_nick_json = {};
            const address_json = {};
            e.forEach(addr => {
                const {seller_nick, is_default, id} = addr;
                if (seller_nick && !seller_nick_json[seller_nick]) { seller_nick_json[seller_nick] = {} }
                if (is_default === 0) {
                    address_json[id] = addr;
                }else {
                    const type = is_default === 1? "def_type": "cancel_type";
                    seller_nick_json[seller_nick][type] = addr.ebs_contact_id
                }
            })
            const json = {seller_nick: seller_nick_json, address: address_json}
            localStorage.setItem(`seller_address_${corp_id}`, JSON.stringify(json))
        });
    }/*卖家默认地址*/

    api("ebs.ElecFace.getEFWaybillSearch",{},function(e){

    });

    let printSet = localStorage.getItem("printSet"+corp_id);
    if(!printSet){
        api("ebs.setting.getprintSet",{},function(e){
            localStorage.setItem("printSet"+corp_id, JSON.stringify(e));
        });
    }/*打印设置*/
}
function initApp(){
    /**
     * 初始登录信息
     */
     let login_info = decodeURI(location.search);
     login_info = login_info.substr(1);
     login_info = login_info.split("&");
     for(let i in login_info){
         let value = login_info[i].split("=");
         if(value[0]=="user_nick"){
             window.user_nick = value[1];//当天登陆用户名称
             localStorage.setItem('login_user_ick',value[1]);
         }else if(value[0]=="user_id"){
             window.user_id = value[1];//当天登陆用户id
             localStorage.setItem('login_user_id',value[1]);
         }else if(value[0]=="corp_id"){
             window.corp_id = value[1];//当前登陆企业id
             localStorage.setItem('login_corp_id',value[1]);
         }else if(value[0]=="corp_nick"){
             window.corp_nick = value[1];//当前登陆企业名称
             localStorage.setItem('login_corp_nick',value[1]);
         }
     }
     window.user_nick = isEmpty(window.user_nick) ? localStorage.getItem('login_user_nick'): window.user_nick;
     window.user_id = isEmpty(window.user_id) ? localStorage.getItem('login_user_id'): window.user_id;
     window.corp_id = isEmpty(window.corp_id) ? localStorage.getItem('login_corp_id'): window.corp_id;
     window.corp_nick = isEmpty(window.corp_nick) ? localStorage.getItem('login_corp_nick'): window.corp_nick;

     window.Gcn_success = 0;/*菜鸟组件是否连接成功*/
     window.webSocket;/*备注：webSocket 是全局对象，不要每次发送请求丢去创建一个，做到webSocket对象重用，和打印组件保持长连接。*/

     initTableConfig() //初始化表格配置信息
     initPrintDate()     //初始化打印信息
     doConnect()         //连接菜鸟打印组件
}
// ========================================================
// Go!
// ========================================================

initApp()
render()
