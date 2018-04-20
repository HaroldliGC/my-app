import {loginAuth, getToken} from '../../../common/utils';

export const LOGIN = "LOGIN";
const address = "http://localhost:61021/";
export function loginAction(str){
    return{
        type: LOGIN,
        str
    }
}

//登陆验证
export function requstLogin(data){
    let recState = 'success';
    const uri = `${address}token`;
    const myHeader = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    });
    const myInit = {
        method: 'POST',
        headers: myHeader,
        body: data,
    }
    return (dispatch) => {
        return fetch(uri,myInit).then(function (response){
            if (response.status === 400) {
              recState = 'failed';
              return;
            }
          return response.json();
          }).then(function(data){
            dispatch(loginAction(recState));
            if (recState === 'success') {
                console.log("recToen",data)
                loginAuth(data.access_token);
                window.location.pathname = "/BookManagePage";
            }
          });
    }
}