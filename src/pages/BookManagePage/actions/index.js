import { newOperatorAction, deleteInfItem, editInf, initializationData, clearStore } from "./consts";
//画面跳转时清空store
export function clearCurrentStore(){
    return (dispatch) => {
        dispatch(clearStore());
    }
}
//请求初始化数据
export function requstInitializationData(uri){
    return (dispatch) => {
        return fetch(uri).then(function (response){
            if (response.status !== 200) {
              console.log("request " + uri + "error! status: " + response.status);
              return;
            }
          return response.json();
          }).then(function(data){
          dispatch(initializationData(data));
          });
    }
}
//上传一条消息到服务器，post新书数据
export function postNewBook(uri,formData){
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');
    const myInit = {    method: 'POST',
                        headers: myHeaders,
                        body: JSON.stringify(formData)
                    };
    return (dispatch) => {
        return fetch(uri,myInit).then(function (response){
            if (response.status !== 201) {
              console.log("request " + uri + "error! status: " + response.status);
              return;
            }
          return response.json();
          }).then(function(data){
              if (data !== undefined){
                console.log("post return data:",data);
                dispatch(newOperatorAction(data));
              }
              else{
                console.log("该书已经存在")
              }
          });
    }
}

//删除图书信息
export function deleteBook(uri,index){
    return (dispatch) => {
        return fetch(uri,{method:'DELETE'}).then(function (response){
            if (response.status !== 200) {
              console.log("request " + uri + "error! status: " + response.status);
              return;
            }
          return response.json();
          }).then(function(data){
              dispatch(deleteInfItem(index));
          });
    }
}
//更新图书信息
export function updateBook(uri,formData,index){
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');
    const myInit = {    method: 'PUT',
                        headers: myHeaders,
                        body: JSON.stringify(formData)
                    };
    return (dispatch) => {
        return fetch(uri,myInit).then(function (response){
            if (response.status !== 204) {
              console.log("request " + uri + "error! status: " + response.status);
              return;
            }
            dispatch(editInf(formData,index));
        }
        );
    }
}
//根据条件进行数据查询
export function searchBook(uri){
    return (dispatch) => {
        return fetch(uri).then(function (response){
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