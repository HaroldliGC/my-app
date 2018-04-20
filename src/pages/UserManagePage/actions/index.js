import {showMessage,addReaderUser,deleteReaderUser,editReaderUser,clearReaderUserStore,initializationReaderUser} from './consts';
import {serviceApi,getToken,clearToken} from '../../../common/utils';

//画面跳转时清空store
export function clearCurrentReaderUserStore(){
    return (dispatch) => {
        dispatch(clearReaderUserStore());
    }
}
//请求初始化数据
export function requstInitializationReaderUser(uri){
    return (dispatch) => {
        return serviceApi(uri).then(function (response){
            if (response.status !== 200) {
              console.log("request " + uri + "error! status: " + response.status);
              return;
            }
          return response.json();
          }).then(function(data){
          dispatch(initializationReaderUser(data));
          });
    }
}
//根据条件进行数据查询
export function searchUser(uri){
    return (dispatch) => {
        return fetch(uri).then(function (response){
            if (response.status !== 200) {
              console.log("request " + uri + "error! status: " + response.status);
              return;
            }
          return response.json();
          }).then(function(data){
              //console.log("returnData:",data);
            dispatch(initializationReaderUser(data));
          });
    }
}

//停用读者
export function blockUpUser(uri,formData,index){
    return (dispatch) => {
        return serviceApi(uri,{method:'PUT',body: JSON.stringify(formData)}).then(function (response){
            console.log("用户状态改变：",response)
            if (response.status !== 204) {
              console.log("request " + uri + "error! status: " + response.status);
              dispatch(showMessage('用户状态更新失败','error'));
              return;
            } else {
                dispatch(editReaderUser(formData,index));
                dispatch(showMessage('用户状态更新成功','success'));
            }
        }
        );
    }
}