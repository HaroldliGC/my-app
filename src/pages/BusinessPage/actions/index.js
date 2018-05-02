import {showMessage,addOrder,deleteOrder,editOrder,initializationOrder} from './consts';
import {serviceApi, HOST} from '../../../common/utils';

//请求初始化数据
export function requstInitializationOrder(){
    const uri = `${HOST}api/Orders/GetOrders/`;
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
            if (data!==undefined){
                dispatch(initializationOrder(data));
            }
        });
    }
}
//根据条件进行数据查询
export function searchOrder(url){
    const uri = `${HOST}api/Orders/GetBusinessOrderBySearch/${url}`;
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
            if (data!==undefined){
                dispatch(initializationOrder(data));
            }
          });
    }
}
//删除订单信息
export function deleteOrderRequst(orderId,index){
    const uri = `${HOST}api/Orders/DeleteOrder/${orderId}`;
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
export function addOrderRequest(formData) {
    const uri = `${HOST}api/Business/borrowBookByManager/`;
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
export function editOrderRequest(orderId,index){
    const uri = `${HOST}api/Business/PutreturnBookByManager/${orderId}`;
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