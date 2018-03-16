import {addReaderUser,deleteReaderUser,editReaderUser,clearReaderUserStore,initializationReaderUser} from './consts';

//画面跳转时清空store
export function clearCurrentReaderUserStore(){
    return (dispatch) => {
        dispatch(clearReaderUserStore());
    }
}
//请求初始化数据
export function requstInitializationReaderUser(uri){
    return (dispatch) => {
        return fetch(uri).then(function (response){
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
            dispatch(editReaderUser(formData,index));
        }
        );
    }
}