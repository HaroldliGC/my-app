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
              if (response.status === 401) {
                dispatch(showMessage("登陆凭证过期，请重新登陆",'info'));
              }
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
              if (data !== undefined){
                dispatch(initializationReaderUser(data));
              }
          });
    }
}

//停用读者
export function blockUpUser(uri,formData,index){
    return (dispatch) => {
        return serviceApi(uri,{method:'PUT',body: JSON.stringify(formData)})
            .then(function (response){
            //console.log("用户状态改变：",response)
            if (response.status !== 200) {
                console.log("request " + uri + "error! status: " + response.status);
                if (response.status === 401) {
                    dispatch(showMessage("登陆凭证过期，请重新登陆",'info'));
                }
                return;
            }
            return response.json();
            }).then(function(data){
                console.log("用户状态改变：",data)
                if (data === "change state success"){
                    dispatch(editReaderUser(formData,index));
                    dispatch(showMessage('用户状态更新成功','success'));
                } else if (data === "you don't have authority"){
                    dispatch(showMessage('您没有相应的操作权限，用户状态更新失败','error'));
                } else {
                    dispatch(showMessage(data,'info'));
                }
            });
    }
}

//重置密码
export function resetPassword(uri,index){
    return (dispatch) => {
        return serviceApi(uri,{method:'PUT'})
            .then(function(response){
                console.log("request " + uri + " status: " + response.status);
                if (response.status === 401) {
                    dispatch(showMessage("登陆凭证过期，请重新登陆",'info'));
                }
                return response.json();
            }).then(function(data){
                console.log("重置密码：",data)
                if (data === "Password reset success"){
                    dispatch(showMessage("重置密码成功，密码为用户证件号后6位",'success'));
                } else if (data === "you don't have authority"){
                    dispatch(showMessage('您没有相应的操作权限，重置密码失败','error'));
                } else {
                    dispatch(showMessage(data,'info'));
                }
            });
    }
}

//新增用户
export function createAccount(uri,formData){
    return (dispatch) => {
        return serviceApi(uri,{method:'POST',body:JSON.stringify(formData)}).then(function (response){
              console.log("request " + uri + " status: " + response.status);
              if (response.status === 201){
                return response.json();
              } else if (response.status === 204){
                console.log("该邮箱已存在");
                dispatch(showMessage("新建用户失败,该邮箱已被注册",'error'));
                return 
              } else if (response.status === 409){
                console.log("该证件号已存在");
                dispatch(showMessage("新建用户失败,该证件号已被注册",'error'));
                return
              } else {
                dispatch(showMessage("新建用户失败,未知的错误",'error'));
                return
              }
          }).then(function(data){
              if (data !== undefined){
                console.log("post return data:",data);
                dispatch(addReaderUser(data));
                dispatch(showMessage("新用户创建成功",'success'))
              }
              
          });
    }
}