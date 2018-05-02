import {showMessage, newOperatorAction, deleteInfItem, editInf, initializationData, clearStore } from "./consts";
import {HOST, getToken, serviceApi} from '../../../common/utils';

//画面跳转时清空store
export function clearCurrentStore(){
    return (dispatch) => {
        dispatch(clearStore());
    }
}
//请求初始化数据
export function requstInitializationData(){
    const uri = `${HOST}api/Books/GetBooks`;
    return (dispatch) => {
        return serviceApi(uri).then(function (response){
            if (response.status !== 200) {
                console.log("request " + uri + "status: " + response.status);
                if (response.status === 401) {
                    dispatch(showMessage("登陆凭证过期，请重新登陆",'info'));
                }
                return;
            }
          return response.json();
          }).then(function(data){
              console.log("InitializationData:",data);
              if (data !== undefined){
                dispatch(initializationData(data));
              }
          });
    }
}
//上传一条消息到服务器，post新书数据
export function postNewBook(formData){
    const uri = `${HOST}api/Books/PostBook`;
    return (dispatch) => {
        return serviceApi(uri,{method:'POST',body:JSON.stringify(formData)}).then(function (response){
            if (response.status !== 201) {
                console.log("request " + uri + "error! status: " + response.status);
                if (response.status === 401) {
                    dispatch(showMessage("登陆凭证过期，请重新登陆",'info'));
                }
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
export function deleteBook(bookId,index){
    const uri = `${HOST}/api/Books/deletebook/${bookId}`;
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
              dispatch(deleteInfItem(index));
              dispatch(showMessage('书籍删除成功','success'));
          });
    }
}
//更新图书信息
export function updateBook(bookId,formData,index){
    const uri = `${HOST}api/Books/putbook/${bookId}`;
    return (dispatch) => {
        return serviceApi(uri,{method: 'PUT', body: JSON.stringify(formData)}).then(function (response){
            if (response.status !== 204) {
              console.log("request " + uri + "error! status: " + response.status);
              if (response.status === 401) {
                dispatch(showMessage("登陆凭证过期，请重新登陆",'info'));
              }
              return;
            } else {
                dispatch(editInf(formData,index));
                dispatch(showMessage('书籍信息更新成功','success'));
            }
        }
        );
    }
}
//根据条件进行数据查询
export function searchBook(url){
    const uri = `${HOST}api/Books/getbookbysearch/${url}`
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
                dispatch(initializationData(data));
              }
          });
    }
}

//上传书籍封面
export function postBookImg(formdata,id){
    const uri = `${HOST}api/BookImages/PostBookImageByManager/${id}`;
    const token = getToken();
    return (dispatch) => {
        return fetch(uri,{
            method: 'POST',
            body: formdata,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(function (response){
            console.log("request " + uri + "  status: " + response.status);
            if (response.status === 401) {
                dispatch(showMessage("登陆凭证过期，请重新登陆",'info'));
                return;
            }
            return response.json();
        }).then(function(data){
            console.log("data",data);
            if (data!==undefined){
                if (data.type === 'success'){
                    dispatch(showMessage(data.message,'success'));
                } else {
                    dispatch(showMessage(data.message,'error'));
                }
            }
        })
    }
}