import {showMessage,addOrder,deleteOrder,editOrder,clearOrderStore,initializationOrder} from './consts';
import {getToken, serviceApi} from '../../../common/utils';

//请求初始化数据
export function requstInitializationOrder(uri){
    return (dispatch) => {
        return serviceApi(uri).then(function (response){
            if (response.status !== 200){
                console.log("request " + uri + "error! status: " + response.status);
                if (response.status === 401) {
                    dispatch(showMessage("登陆凭证过期，请重新登陆",'info'));
                }
                return;
            }
            return response.json();
        }).then(function(data){
            dispatch(initializationOrder(data));
        });
    }
}
//根据条件进行数据查询
export function searchOrder(uri){
    return (dispatch) => {
        return serviceApi(uri).then(function (response){
            if (response.status !== 200) {
              console.log("request " + uri + "error! status: " + response.status);
              if (response.status === 401) {
                dispatch(showMessage("登陆凭证过期，请重新登陆",'info'));
              }
              return;
            }
          return response.json();
          }).then(function(data){
              //console.log("returnData:",data);
            dispatch(initializationOrder(data));
          });
    }
}
//删除订单信息
export function deleteOrderRequst(uri,index){
    return (dispatch) => {
        return serviceApi(uri,{method:'DELETE'}).then(function (response){
            if (response.status !== 200) {
              console.log("request " + uri + "error! status: " + response.status);
              if (response.status === 401) {
                dispatch(showMessage("登陆凭证过期，请重新登陆",'info'));
              }
              return;
            }
          return response.json();
          }).then(function(data){
              dispatch(showMessage("订单删除成功",'success'));
              dispatch(deleteOrder(index));
          });
    }
}

//新增订单,借书
export function addOrderRequest(uri, formData) {
    return (dispatch) => {
        return serviceApi(uri,{method:'POST',body:JSON.stringify(formData)}).then(function(response){
            if (response.status === 401) {
                dispatch(showMessage("登陆凭证过期，请重新登陆",'info'));
                return;
            }
        return response.json();
        }).then(function(data){
            if (data !== undefined){
                switch(data.type){
                    case 'success':
                        dispatch(showMessage("借书业务办理成功","success"));
                        dispatch(addOrder(data.order));
                        break;
                    case 'failed':
                        dispatch(showMessage(`借书业务办理失败:${data.message}`,"error"));
                        break;
                    default:
                        dispatch(showMessage(data.message,"info"));
                }
            }
        })
    }
}

//更新订单信息，还书
export function editOrderRequest(uri,index){
    return (dispatch) => {
        return serviceApi(uri,{method:'PUT'}).then(function(response){
            if (response.status === 401) {
                dispatch(showMessage("登陆凭证过期，请重新登陆",'info'));
                return;
            }
        return response.json();
        }).then(function(data){
            if (data !== undefined){
                switch(data.type){
                    case 'success':
                        dispatch(showMessage("还书业务办理成功","success"));
                        dispatch(editOrder(data.order,index));
                        break;
                    case 'failed':
                        dispatch(showMessage(`还书业务办理失败:${data.message}`,"error"));
                        break;
                    default:
                        dispatch(showMessage(data.message,"info"));
                }
            }
        })
    }
}