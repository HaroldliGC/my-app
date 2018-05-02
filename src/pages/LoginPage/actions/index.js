import {loginAuth, HOST, serviceApi} from '../../../common/utils';

export const LOGIN = "LOGIN";
export function loginAction(str){
    return{
        type: LOGIN,
        str
    }
}

//登陆验证
export function requstLogin(data,formData){
    const userInf = {Account:formData.username,Password:formData.password}
    let recState = 'success';
    let Token = '';
    const uri = `${HOST}token`;
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
                Token = data.access_token;
                serviceApi(`${HOST}api/Login/ManagerLogin`,{method:'POST',body:JSON.stringify(userInf)}
                ).then(function(response){
                    return response.json();
                }).then(function(data){
                    console.log("data:",data)
                    if (data === 'success'){
                        loginAuth(Token);
                        window.location.pathname = "/BookManagePage";
                        recState = 'success';
                    } else {
                        recState = 'failed';
                    }
                    dispatch(loginAction(recState));
                })
                /*
                console.log("recToen",data)
                loginAuth(data.access_token);
                window.location.pathname = "/BookManagePage";
                */
            }
          });
    }
}