import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request_ml = (method, url, data, custom_headers) => {
    return axios({
        method: method,
        url: `http://localhost:8000${url}`,
        data: data,
        headers: custom_headers});
};