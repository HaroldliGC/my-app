export const LOGIN = "LOGIN";

export function loginAction(str){
    return{
        type: LOGIN,
        str
    }
}

//登陆验证
export function requstLogin(uri){
    return (dispatch) => {
        return fetch(uri).then(function (response){
            if (response.status !== 200) {
              console.log("request " + uri + "error! status: " + response.status);
              return;
            }
          return response.json();
          }).then(function(data){
            dispatch(loginAction(data));
            if (data === 'success'){
                window.location.pathname = "/BookManagePage";
            }
          });
    }
}