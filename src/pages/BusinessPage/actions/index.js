import {addOrder,deleteOrder,editOrder,clearOrderStore,initializationOrder} from './consts';
import {getToken, serviceApi} from '../../../common/utils';

//请求初始化数据
export function requstInitializationOrder(uri){
    return (dispatch) => {
        return serviceApi(uri).then(function (response){
            if (response.status !== 200){
                console.log("request " + uri + "error! status: " + response.status);
                if (response.status === 401) {
                    //dispatch(showMessage("登陆凭证过期，请重新登陆",'info'));
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
                //dispatch(showMessage("登陆凭证过期，请重新登陆",'info'));
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
                //dispatch(showMessage("登陆凭证过期，请重新登陆",'info'));
              }
              return;
            }
          return response.json();
          }).then(function(data){
              dispatch(deleteOrder(index));
          });
    }
}