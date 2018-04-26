import {initBookByNumber, initBookByReview, showMessage} from './consts';
import {getToken, serviceApi, HOST} from '../../../common/utils';

export function getBookByNumber(uri){
    return (dispatch) => {
        return serviceApi(`${HOST}${uri}`).then(function (response){
            if (response.status !== 200){
                console.log("request " + uri + "status: " + response.status);
                if (response.status === 401) {
                    dispatch(showMessage("登陆凭证过期，请重新登陆",'info'));
                }
                return;
            }
            return response.json();
        }).then(function(data){
            if (data !== undefined){
                dispatch(initBookByNumber(data));
            }
        })
    }
}

export function getBookByReview(uri){
    return (dispatch) => {
        return serviceApi(`${HOST}${uri}`).then(function (response){
            if (response.status !== 200){
                console.log("request " + uri + "status: " + response.status);
                if (response.status === 401) {
                    dispatch(showMessage("登陆凭证过期，请重新登陆",'info'));
                }
                return;
            }
            return response.json();
        }).then(function(data){
            if (data !== undefined){
                dispatch(initBookByReview(data));
            }
        })
    }
}