import {showMessage, newOperatorAction, deleteInfItem, editInf, initializationData, clearStore } from "./consts";
import {getToken, serviceApi} from '../../../common/utils';

//画面跳转时清空store
export function clearCurrentStore(){
    return (dispatch) => {
        dispatch(clearStore());
    }
}
//请求初始化数据
export function requstInitializationData(uri){
    return (dispatch) => {
        return serviceApi(uri).then(function (response){
            if (response.status !== 200) {
              console.log("request " + uri + "error! status: " + response.status);
              return;
            }
          return response.json();
          }).then(function(data){
              console.log("InitializationData:",data);
          dispatch(initializationData(data));
          });
    }
}
//上传一条消息到服务器，post新书数据
export function postNewBook(uri,formData){
    return (dispatch) => {
        return serviceApi(uri,{method:'POST',body:JSON.stringify(formData)}).then(function (response){
            if (response.status !== 201) {
              console.log("request " + uri + "error! status: " + response.status);
              return;
            }
          return response.json();
          }).then(function(data){
              if (data !== undefined){
                console.log("post return data:",data);
                dispatch(newOperatorAction(data));
                dispatch(showMessage("书籍添加成功",'success'))
              }
              else{
                console.log("该书已经存在");
                dispatch(showMessage("书籍添加失败,该书已经存在",'error'));
              }
          });
    }
}

//删除图书信息
export function deleteBook(uri,index){
    return (dispatch) => {
        return serviceApi(uri,{method:'DELETE'}).then(function (response){
            if (response.status !== 200) {
              console.log("request " + uri + "error! status: " + response.status);
              return;
            }
          return response.json();
          }).then(function(data){
              dispatch(deleteInfItem(index));
              dispatch(showMessage('书籍删除成功','success'));
          });
    }
}
//更新图书信息
export function updateBook(uri,formData,index){
    return (dispatch) => {
        return serviceApi(uri,{method: 'PUT', body: JSON.stringify(formData)}).then(function (response){
            if (response.status !== 204) {
              console.log("request " + uri + "error! status: " + response.status);
              return;
            } else {
                console.log("put return data:",response)
                dispatch(editInf(formData,index));
                dispatch(showMessage('书籍信息更新成功','success'));
            }
        }
        );
    }
}
//根据条件进行数据查询
export function searchBook(uri){
    return (dispatch) => {
        return serviceApi(uri).then(function (response){
            if (response.status !== 200) {
              console.log("request " + uri + "error! status: " + response.status);
              return;
            }
          return response.json();
          }).then(function(data){
              //console.log("returnData:",data);
            dispatch(initializationData(data));
          });
    }
}