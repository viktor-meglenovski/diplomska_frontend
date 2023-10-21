import axios from 'axios';
import {getAuthToken} from "./axios_helper";

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request_ml = (method, url, data, custom_headers) => {

    if (!custom_headers){
        custom_headers = {}
    }
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        custom_headers['Authorization'] = `Bearer ${getAuthToken()}`
    }
    return axios({
        method: method,
        url: `http://localhost:8000${url}`,
        data: data,
        headers: custom_headers});
};