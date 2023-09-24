import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const getRole = () => {
    return window.localStorage.getItem('role');
};

export const getUser = () => {
    return window.localStorage.getItem('user');
};

export const getFirstName = () => {
    return window.localStorage.getItem('firstName');
};

export const getLastName = () => {
    return window.localStorage.getItem('lastName');
};

export const setAuthHeader = (token) => {
    window.localStorage.setItem('auth_token', token);
    if(token!==''){
        decodeAuthToken(token)
    }
};

export const removeToken = () => {
    window.localStorage.removeItem('auth_token');
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('firstName')
    window.localStorage.removeItem('lastName')
    window.localStorage.removeItem('role')
}
export const decodeAuthToken = (token) => {
    const decoded = jwt_decode(token);
    window.localStorage.setItem('user', decoded.user)
    window.localStorage.setItem('firstName', decoded.firstName)
    window.localStorage.setItem('lastName', decoded.lastName)
    window.localStorage.setItem('role', decoded.role)
};

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (method, url, data) => {

    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`};
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data});
};