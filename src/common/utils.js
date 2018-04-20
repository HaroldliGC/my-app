import {LSKEY_ACCESS_TOKEN} from './StorageKeys';

export const loginAuth = (token) => {
    localStorage.setItem(LSKEY_ACCESS_TOKEN,token);
}

export const getToken = () => {
    const token = localStorage.getItem(LSKEY_ACCESS_TOKEN);
    if (!token){
        return '';
    }
    return token;
}

export const clearToken = () => {
    localStorage.removeItem(LSKEY_ACCESS_TOKEN);
}

export const serviceApi = (url, options = {}, responseOption) => {
    const token = getToken();
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
    };
    if (headers['Content-Type'] === 'multipart/form-data'){
        delete headers['Content-Type'];
    }
    return fetch(url, {
        ...options,
        headers
    });
}
